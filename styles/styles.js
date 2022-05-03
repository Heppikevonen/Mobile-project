import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import Constants from "expo-constants";
import theme from "./Theme";

export default StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    marginBottom: 6,
  },
  podcastHeadline: {
    fontSize: 16,
    fontWeight: "bold",
    width: 150,
    marginBottom: 24,
  },

  containerPlayer: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",
    //alignSelf: 'stretch',
    backgroundColor: "white",
  },
  imageContainer: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  detailsContainer: {
    height: 130,
    marginTop: 10,
    alignItems: "center",
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  playbackSlider: {
    alignSelf: "stretch",
    marginLeft: 10,
    marginRight: 10,
  },
  timeStamp: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 16,
    minHeight: 16,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
  },
  sliderThumb: {
    width: 12,
    height: 12,
    backgroundColor: "#EA5A00",
    borderRadius: 10 / 2,
  },
  sliderTrack: {
    height: 2,

    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 5,
  },
  radioControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    width: "80%",
  },
  bottomSection: {
    borderTopColor: "#F4EEEA",
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },

  flex: {
    flexDirection: "row",
    marginTop: 20,
    height: 60,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: Dimensions.get("screen").height - 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  textInputLarge: {
    marginTop: 10,
    marginBottom: 10,
    height: 150,
  },
  showMoreButton: {
    marginLeft: 10,
  },
  showMoreText: {
    color: "orange",
    marginLeft: 5,
  },
  podcastHeader: {
    height: 200,
  },
  descriptionText: {
    // marginTop: 5,
    // marginBottom: 5,
  },
  descriptionScroll: {
    marginTop: 5,
    marginBottom: 10
  },
  smallDescription: {
    marginLeft: 10,
  },
  podcastImage: {
    paddingRight: 10,
    aspectRatio: 1 * 1,
    maxHeight: "100%",
  },
  episodeHeader: {
    fontSize: 30,
    marginBottom: 10,
    color: "black",
  },
  episodeName: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  episodeDivider: {
    height: 2,
    marginTop: 10,
  },
  listItem: {
    height: 80,
  },
  dropDown: {
    marginTop: 20,
    marginBottom: 5,
  },
  scrollView: {
    marginTop: 100,
  },
  searchBox: {
    marginBottom: 20,
    borderColor: "#333",
    borderWidth: 1,
    padding: 5,
  },
  image: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 210,
    //maxHeight: '100%'
  },
  textAccordion: {
    //textAlign: 'center',
    fontWeight: "bold",
    fontSize: 22,
  },
  textImage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  buttonSmall: {
    borderRadius: 20,
    width: 135,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: theme.colors.primary,
  },
  buttonSmallDisabled: {
    borderRadius: 20,
    width: 135,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: theme.colors.neutral80,
    opacity: 0.87,
  },
  center: {
    alignContent: "center",
    //justifyContent: 'center',
  },
  textMediumBody: {
    color: theme.colors.onSurface,
    fontSize: 12,
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
  },
  textLargeLabel: {
    color: theme.colors.onSurface,
    fontWeight: "bold",
    fontSize: 16,
  },
  textMediumTitle: {
    color: theme.colors.onSurface,
    fontWeight: "bold",
    fontSize: 22,
    flex: 1,
  },
  runImage: {
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  runsContainer: {
    height: 210,
  },
  runsImg: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  runsHeader: {
    color: theme.colors.onSurface,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left",
  },
  runsBody: {
    color: theme.colors.onSurface,
    fontSize: 12,
    textAlign: "center",
    paddingTop: 10,
    paddingRight: 5,
  },
});
