import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import { LogBox } from 'react-native'
import { msgToken } from './components/Notifications';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  
  return (
	  <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}
