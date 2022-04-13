import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import PodcastOverview from '../screens/PodcastOverview';
import RadioPlayer from '../screens/RadioPlayer';
import SongRequest from '../screens/SongRequest';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';
import PodcastReview from '../screens/PodcastReview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Podcasts"
          component={PodcastOverview}
        />
        <Stack.Screen 
          name="podcastreview"
          component={PodcastReview}
          options={({ route }) => ({ headerTitle: route.params.title, title: 'podcastname'})}
        />
      </Stack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    
    <Tab.Navigator style={styles.bottomSection}>
      <Tab.Screen name='Home' 
      component={RadioPlayer} 
      options={{tabBarIcon: ({ color, size }) => ( 
      <MaterialIcons name='headset' size={size} color='black' />
        ),
        }} />
      <Tab.Screen name='Podcasts' 
      component={StackNavigator}
      options={{tabBarIcon: ({ color, size }) => ( 
      <MaterialIcons name='menu' size={size} color='black' />
          ), headerShown: false
          }} />
      <Tab.Screen name='Song request'
       component={SongRequest}
       options={{tabBarIcon: ({ color, size }) => ( 
      <Ionicons name="musical-note" size={size} color='black' />
          ),
          }} />
    </Tab.Navigator>
    
  )
}

export default AppNavigator