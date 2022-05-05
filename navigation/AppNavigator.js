import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PodcastOverview from "../screens/PodcastOverview";
import RadioPlayer from "../screens/RadioPlayer";
import SongRequest from "../screens/SongRequest";
import Information from "../screens/Information";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import styles from "../styles/styles";
import PodcastReview from "../screens/PodcastReview";
import theme from "../styles/Theme";
import Home from "../screens/Home";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const screenOptionsStyle = {
  headerStyle: { backgroundColor: theme.colors.surface2 },
  headerTintColor: theme.colors.onSurface,
  headerTitleAlign: "center",
  cardStyle: { backgroundColor: theme.colors.surface },
};
const tabOptionsStyle = {
  tabBarStyle: { backgroundColor: theme.colors.surface2, height: 70 },
  tabBarLabelStyle: { paddingBottom: 10, color: theme.colors.onSurface },
  tabBarActiveBackgroundColor: theme.colors.surfaceVariant,
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen name="Podcasts" component={PodcastOverview} />
      <Stack.Screen
        name="podcastreview"
        component={PodcastReview}
        options={({ route }) => ({
          headerTitle: route.params.title,
          title: "podcastname",
        })}
      />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: (
            props // App Logo
          ) => (
            <Image
              style={{ width: 230, height: 50 }}
              source={require("../assets/images/logo.png")}
              resizeMode="contain"
            />
          ),
          headerTitleStyle: { flex: 1, textAlign: "center" },
        }}
      />
    </Stack.Navigator>
  );
};

const InfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen
        name="Information"
        component={Information}
        options={{ headerTitle: "Information" }}
      />
    </Stack.Navigator>
  );
};

const SongRequestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={ screenOptionsStyle}>
      <Stack.Screen
        name="Songrequest"
        component={SongRequest}
        options={{ headerTitle: "Song Request" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabOptionsStyle}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (color) => <Ionicons name="home" size={24} color={color} />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Player"
        component={RadioPlayer}
        options={{
          tabBarIcon: (color) => <Ionicons name="play" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="PodcastsTab"
        component={StackNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="playlist-play"
              size={24}
              color={theme.colors.onSurface}
            />
          ),
          tabBarLabel: "Podcasts",
        }}
      />
      <Tab.Screen
        name="SongRequestTab"
        component={SongRequestNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="musical-note"
              size={24}
              color={theme.colors.onSurface}
            />
          ),
          tabBarLabel: "Song Request",
        }}
      />
      <Tab.Screen
        name="InformationTab"
        component={InfoStackNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          ),
          tabBarLabel: "Information",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
