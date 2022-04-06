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
  
  containerPlayer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#f94c94',
	},
	portraitContainer: {
		marginTop: 0,
	},
	portrait: {
		height: 300,
		width: 450,
	},
	detailsContainer: {
		height: 150,
		marginTop: 10,
		alignItems: 'center',
	},
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	playbackSlider: {
		alignSelf: 'stretch',
		marginLeft: 10,
		marginRight: 10,
	},
	text: {
		fontSize: 16,
		minHeight: 16,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		color: '#ffffff'
	},
	sliderThumb: {
		width: 12,
		height: 12,
		backgroundColor: '#f62976',
		borderRadius: 10 / 2,
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 2,
		shadowOpacity: 1,
	},
	sliderTrack: {
		height: 2,
		backgroundColor: '#D3D3D3',
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10
	},
	buttonsContainerTopRow: {
		maxHeight: 40,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		maxHeight: 40,
		alignSelf: 'stretch',
		paddingRight: 20,
	},
	
	buttonsContainerBottomRow: {
		alignSelf: 'stretch',
	},
	
})