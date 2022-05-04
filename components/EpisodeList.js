import { View, FlatList, TouchableOpacity } from 'react-native'
import styles from '../styles/styles'
import React from 'react'
import XDate from 'xdate'
import { Divider, Text } from 'react-native-paper'
import RadioPlayer from '../screens/RadioPlayer'
import {useNavigation} from '@react-navigation/native'

export default function EpisodeList ({ data, initialNumToRender }) {

  const navigation = useNavigation()

  function durationFormatter (duration) {
    if (duration.length < 6) {
      let minutes = parseInt(duration.substring(0, 2))
      let seconds = parseInt(duration.substring(3, 4))
      let formatted = Math.round(minutes + seconds / 60)
      return formatted
    } else {
      let hours = parseInt(duration.substring(0, 2))
      let minutes = parseInt(duration.substring(3, 5))
      let seconds = parseInt(duration.substring(6, 8))
      let formatted = Math.round(minutes + hours * 60 + seconds / 60)
      return formatted
    }
  }

  return (
    <>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      <FlatList
        data={data}
        initialNumToRender={initialNumToRender}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Player', { episode: item.enclosures[0].url})}>
            <View style={styles.listItem}>
              <Text style={styles.episodeName}>
                {item.title.substring(0, 35)}...
              </Text>
              <Text>
                {new XDate(item.published).toString('d MMM yyyy')} -{' '}
                {!item.itunes.duration.includes(':')
                  ? Math.round(item.itunes.duration / 60) + ' minutes'
                  : Math.round(durationFormatter(item.itunes.duration)) + ' minutes'}
              </Text>
              <Divider style={styles.episodeDivider} />
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  )
}
