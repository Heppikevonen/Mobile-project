import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PodcastOverview from '../screens/PodcastOverview';
import RadioPlayer from '../screens/RadioPlayer';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='PodcastOverview' component={PodcastOverview} />
      <Tab.Screen name='RadioPlayer' component={RadioPlayer} />
    </Tab.Navigator>
  )
}

export default AppNavigator