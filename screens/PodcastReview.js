import {
  View,
  Image,
  BackHandler,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Provider as PaperProvider,
  useTheme,
  Divider,
  Text
} from 'react-native-paper'
import { Col, Row, Grid } from 'react-native-easy-grid'
import theme from '../styles/Theme'
import styles from '../styles/styles'
import XDate from 'xdate'

export default function PodcastReview ({ route, navigation }) {
  const { image, description, items } = route.params
  const [showMore, setShowMore] = useState(false)
  const DATA = items

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', close)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', close)
    }
  }, [])

  function close () {
    navigation.goBack(null)
    return true
  }


  function dateFormat(date) {

  }

  console.log(items)

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Grid>
          <Row style={styles.podcastHeader}>
            <Col>
              <Image style={styles.podcastImage} source={{ uri: image }} />
            </Col>
            <Col>
              <Text style={styles.smallDescription}>
                {!showMore && description.length > 175 ? (
                  <>
                    {description.substring(0, 175) + '...'}
                    <Pressable
                      style={styles.showMoreButton}
                      onPress={() => setShowMore(!showMore)}
                    >
                      <Text style={styles.showMoreText}>
                        {!showMore ? 'Show more' : null}
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  description.substring(0, 175)
                )}
              </Text>
            </Col>
          </Row>
          {showMore ? (
            <Row>
              <ScrollView>
                <Col>
                  <Text style={styles.descriptionText}>
                    {description}
                    <Pressable
                      style={styles.showMoreButton}
                      onPress={() => setShowMore(!showMore)}
                    >
                      <Text style={styles.showMoreText}>
                        {showMore ? 'Show less' : null}
                      </Text>
                    </Pressable>
                  </Text>
                </Col>
              </ScrollView>
            </Row>
          ) : null}
          <Row>
            <Col>
              <Text style={styles.episodeHeader}>Episodes:</Text>
              <FlatList
                data={DATA}
                initialNumToRender={5}
                renderItem={({ item }) => (
                  <View style={styles.listItem}>
                    <Text style={styles.episodeName}>{item.title.substring(0, 35)}...</Text>
                    <Text>{new XDate(item.published).toString('d MMM yyyy')} - {item.itunes.duration}</Text>
                    {/* <Text>{Date.parse(item.published)}</Text> */}
                    <Divider style={styles.episodeDivider} />
                  </View>
                )}
              />
            </Col>
          </Row>
        </Grid>
      </View>
    </PaperProvider>
  )
}
