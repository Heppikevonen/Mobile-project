import RadioPlayer from './screens/RadioPlayer'
import PodcastOverview from './screens/PodcastOverview'
import Poll from './screens/Poll'
import styles from './styles/styles'
import { View, ScrollView } from 'react-native'

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <RadioPlayer />
      <PodcastOverview />
      <Poll />
    </ScrollView>
	  
  )
}