import React, { Component, useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions } from 'react-native';
//import { Asset } from "expo-asset";
import styles from '../styles/styles';
//import theme from './styles/Theme';
//import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
//import { useFonts } from 'expo-font';;


//const {width, height} = Dimensions.get('window');


class PlaylistItem {
	constructor(name, uri, image) {
	  this.name = name;
	  this.uri = uri;
	  this.image = image;
	}
}

const runnerRadioPlaylist = [
	new PlaylistItem(
		"Comfort Fit - “Sorry”",
		"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
		"https://www.ndr.de/mediathek/podcast4798_v-quadratxl.jpg"

		
	  ),
	  new PlaylistItem(
		"Big Buck Bunny",
		"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
		"https://firebasestorage.googleapis.com/v0/b/testi-f9856.appspot.com/o/Screenshot%202022-03-30%20000803.png?alt=media&token=ca9bb44b-2b14-411b-9eed-b5fab259b5c8"
		
	  ),

    //   {
    //     title: 'add smt',
    //     author: 'add smt',
    //     uri:
    //       '',
    //     imageSource: ''
    //   }
]




export default class RadioPlayer extends Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}


	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: runnerRadioPlaylist[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < runnerRadioPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < runnerRadioPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{runnerRadioPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{runnerRadioPlaylist[currentIndex].author}
				</Text>
			</View>
		) : null
	}


	render() {
		return (
			<View style={styles.containerRadio}>
				<Image
					style={styles.radioCover}
					source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/testi-f9856.appspot.com/o/Screenshot%202022-03-30%20000803.png?alt=media&token=ca9bb44b-2b14-411b-9eed-b5fab259b5c8' }}
				/>
				<View>
				<Slider
  					style={styles.progressBar}
  					minimumValue={0}
 					maximumValue={1}
  					minimumTrackTintColor="#FFFFFF"
  					maximumTrackTintColor="#000000"
				/>
				</View>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name="arrow-back-circle-outline" size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name="pause-circle-outline" size={48} color='#444' />
						) : (
							<Ionicons name="play-circle-outline" size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name="arrow-forward-circle-outline" size={48} color='#444' />
					</TouchableOpacity>
			
				
				</View>
				
				{this.renderFileInfo()}
			</View>
		)
	}
}