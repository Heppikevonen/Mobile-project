import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PodcastOverview from "../screens/PodcastOverview";
import RadioPlayer from "../screens/RadioPlayer";
import SongRequest from "../screens/SongRequest";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import styles from "../styles/styles";
import PodcastReview from "../screens/PodcastReview";
import theme from "../styles/Theme";
import Home from "../screens/Home";
import {Image} from "react-native" 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface2},
        headerTintColor: theme.colors.onSurface,
        headerTitleAlign: 'center',
        cardStyle:{ backgroundColor: theme.colors.surface}
      }}
    >   
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface2},
        headerTintColor: theme.colors.onSurface,
        headerTitleAlign: 'center',
        cardStyle:{ backgroundColor: theme.colors.surface}
      }}
    >      
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ 
          headerTitle: (props) => ( // App Logo
          <Image
            style={{ width: 230, height: 50 }}
            source={require('../assets/images/logo.png')}
            resizeMode='contain'
          />
    ),
    headerTitleStyle: { flex: 1, textAlign: 'center' },
    }}
  />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      style={styles.bottomSection} //What is this style used for? I dont think it does anything
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.surface2, height: 70 },
        tabBarLabelStyle: { paddingBottom: 10, color: theme.colors.onSurface },
        tabBarActiveBackgroundColor: theme.colors.surfaceVariant,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (color) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Player"
        component={RadioPlayer}
        options={{
          tabBarIcon: (color) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Podcasts"
        component={StackNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="playlist-play"
              size={24}
              color={theme.colors.onSurface}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Song request"
        component={SongRequest}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="musical-note"
              size={24}
              color={theme.colors.onSurface}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={SongRequest}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
