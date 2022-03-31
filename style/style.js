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
  },
  headline: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  flex: {
    flexDirection: "row", 
    marginTop: 20,
    height: 60,
  },
})