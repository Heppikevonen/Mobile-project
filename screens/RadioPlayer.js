import React, { Component } from 'react';
import { TouchableOpacity, View, Image, Text, SafeAreaView } from 'react-native';
//import { Asset } from "expo-asset";
//import theme from './styles/Theme';
//import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import { PodcastPlaylist } from '../constants/PodcastPlaylist';
import styles from '../styles/styles';


//const {width, height} = Dimensions.get('window');

const DISABLED_OPACITY = 0.5;


class RadioPlayer extends Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = null;
		this.state = {
			playbackInstanceTitle: null,
			playbackInstanceAuthor: null,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: false,
			volume: 1.0,
			rate: 1.0,
			image: null,
		};
	}


	async componentDidMount() {
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false
		});
		(async () => {
			await Font.loadAsync({
				roboRegular: require('../assets/fonts/Roboto-Regular.ttf'),
				});
			this.setState({ fontLoaded: true });
		})();

		this._loadNewPlaybackInstance(false);
	}

	componentWillUnmount() {
		this.playbackInstance.unloadAsync();
		console.log('unmount');
	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			this.playbackInstance.setOnPlaybackStatusUpdate(null);
			this.playbackInstance = null;
		}

		const source = { uri: PodcastPlaylist[this.index].uri };
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			volume: this.state.volume,
		};

		const { sound, status } = await Audio.Sound.createAsync(
			source,
			initialStatus,
			this._onPlaybackStatusUpdate
		);
		this.playbackInstance = sound;

		this._updateScreenForLoading(false);
	}

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				isPlaying: false,
				playbackInstanceTitle: null,
				playbackInstanceAuthor: null,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true,
			});
		} else {
			this.setState({
				playbackInstanceTitle: PodcastPlaylist[this.index].title,
				playbackInstanceAuthor: PodcastPlaylist[this.index].author,
				image: PodcastPlaylist[this.index].imageSource,
				isLoading: false,
			});
		}
	}

	_onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				volume: status.volume,
			});
			if (status.didJustFinish) {
				this._advanceIndex(true);
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	_advanceIndex(forward) {
		this.index =
			(this.index + (forward ? 1 : PodcastPlaylist.length - 1)) %
			PodcastPlaylist.length;
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);

		this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync();
			} else {
				this.playbackInstance.playAsync();
			}
		}
	};

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
		}
	};

	_onForwardPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(true);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onBackPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(false);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};




	_onSeekSliderValueChange = value => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true;
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
			this.playbackInstance.pauseAsync();
		}
	};

	_onSeekSliderSlidingComplete = async value => {
		if (this.playbackInstance != null) {
			this.isSeeking = false;
			const seekPosition = value * this.state.playbackInstanceDuration;
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition);
			} else {
				this.playbackInstance.setPositionAsync(seekPosition);
			}
		}
	};

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return (
				this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
			);
		}
		return 0;
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(
				this.state.playbackInstancePosition
			)} / ${this._getMMSSFromMillis(
				this.state.playbackInstanceDuration
			)}`;
		}
		return '';
	}

	render() {
		return !this.state.fontLoaded ? (
			<View />
		) : (
			<SafeAreaView style={styles.containerPlayer}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={{
						uri: this.state.image,
						}}
					/>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={[styles.text]}>
						{this.state.playbackInstanceTitle}
					</Text>
					<Text style={[styles.text]}>
						{this.state.playbackInstanceAuthor}
					</Text>
				
				</View>
				<View
					style={[
						styles.playbackContainer,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<Slider
						style={styles.playbackSlider}
						value={this._getSeekSliderPosition()}
						onValueChange={this._onSeekSliderValueChange}
						onSlidingComplete={this._onSeekSliderSlidingComplete}
						thumbStyle={ styles.sliderThumb }
						trackStyle={ styles.sliderTrack }
						minimumTrackTintColor="#EA5A00"
						maximumTrackTintColor="#f0cbb4"
						disabled={this.state.isLoading}
					/>
				</View>
				<View style={[styles.timeStamp]}>
				<Text > {this._getMMSSFromMillis(this.state.playbackInstancePosition)} </Text>
				<Text > {this._getMMSSFromMillis(this.state.playbackInstanceDuration)} </Text>
				</View>
				
				<View
					style={[
						styles.radioControlsContainer,
						
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<TouchableOpacity
						underlayColor={'#4cf9e8'}
						//style={styles.wrapper}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Ionicons
								name="md-play-back-sharp"
								size={50}
								color="black"
							/>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						underlayColor={'#4cf9e8'}
						//style={styles.wrapper}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<View>
							{this.state.isPlaying ? (
								<Ionicons
									name="md-pause-sharp"
									size={50}
									color="black"
								/>
							) : (
								<Ionicons
									name="md-play-sharp"
									size={50}
									color="black"
								/>
							)}
						</View>
					</TouchableOpacity>
					
					<TouchableOpacity
						underlayColor={'#4cf9e8'}
						//style={styles.wrapper}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Ionicons
								name="md-play-forward-sharp"
								size={50}
								color="black"
							/>
						</View>
					</TouchableOpacity>
				</View>
				
				
			</SafeAreaView>
		);
	}
}

export default RadioPlayer;