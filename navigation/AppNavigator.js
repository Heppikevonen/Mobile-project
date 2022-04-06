import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PodcastOverview from '../screens/PodcastOverview';
import RadioPlayer from '../screens/RadioPlayer';
import SongRequest from '../screens/SongRequest';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' 
      component={RadioPlayer} 
      options={{tabBarIcon: ({ color, size }) => ( 
      <MaterialIcons name='headset' size={size} color={color} />
        ),
        }} />
      <Tab.Screen name='Podcasts' 
      component={PodcastOverview}
      options={{tabBarIcon: ({ color, size }) => ( 
      <MaterialIcons name='menu' size={size} color={color} />
          ),
          }} />
      <Tab.Screen name='Song request'
       component={SongRequest}
       options={{tabBarIcon: ({ color, size }) => ( 
      <Ionicons name="musical-note" size={size} color={color} />
          ),
          }} />
    </Tab.Navigator>
  )
}

export default AppNavigator