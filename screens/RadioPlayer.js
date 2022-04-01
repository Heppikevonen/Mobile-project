import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from '../styles/styles';
//import theme from './styles/Theme';
//import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const runnerRadioPlaylist = [
	{
		title: 'Add Title',
		author: 'Add Author',
		uri:
			'https://mediandr-a.akamaihd.net/download/podcasts/podcast4684/AU-20220329-1639-3100.mp3',
		imageSource: 'https://www.ndr.de/mediathek/podcast4798_v-quadratxl.jpg'
	},
    {
        title: 'Add Title',
        author: 'Add Author',
        uri:
          'https://firebasestorage.googleapis.com/v0/b/testi-f9856.appspot.com/o/naytappa.mp3?alt=media&token=78f8faed-f1c6-4083-8462-85f892cbee5c',
        imageSource: 'https://firebasestorage.googleapis.com/v0/b/testi-f9856.appspot.com/o/Screenshot%202022-03-30%20000803.png?alt=media&token=ca9bb44b-2b14-411b-9eed-b5fab259b5c8'
      }
      //**rt it only works forwads not backwards */

    //   {
    //     title: 'add smt',
    //     author: 'add smt',
    //     uri:
    //       'any link you want',
    //     imageSource: 'any link you want'
    //   }
]

export default class RadioPlayer extends React.Component {
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