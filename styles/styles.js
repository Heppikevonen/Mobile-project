import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  tinyLogo: {
    width: 150, 
    height: 150,
	marginBottom: 6,
	
	

  },
  podcastHeadline: {
    fontSize: 16, 
    fontWeight: 'bold',
	width: 150,
	marginBottom: 24,
  },
  flex: {
    flexDirection: "row", 
    marginTop: 20,
    height: 60,
  },
  containerRadio: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center'
  },
  radioCover: {
	width: 250,
	height: 250
  },
  trackInfo: {
	padding: 40,
	backgroundColor: '#fff'
  },
  trackInfoText: {
	textAlign: 'center',
	flexWrap: 'wrap',
	color: '#550088'
  },
  largeText: {
	fontSize: 22
  },
  smallText: {
	fontSize: 16
  },
  control: {
  margin: 20
  },
  controls: {
	flexDirection: 'row'
  },
  progressBar: {
	width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
})