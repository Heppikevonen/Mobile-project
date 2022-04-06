import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
	paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  tinyLogo: {
    width: 150,
    height: 150,
    marginBottom: 6
  },
  podcastHeadline: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 150,
    marginBottom: 24
  },
  flex: {
    flexDirection: 'row',
    marginTop: 20,
    height: 60
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
  centeredView: {
    flex: 1,
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
	maxHeight: Dimensions.get('screen').height - 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
	marginTop: 30
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
