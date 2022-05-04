import {
  View,
  Image,
  BackHandler,
  Pressable,
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
import EpisodeList from '../components/EpisodeList'

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
                  <Text>{!showMore ? description.substring(0, 175) : null}</Text>
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
              <EpisodeList data={DATA} initialNumToRender={5} />
            </Col>
          </Row>
        </Grid>
      </View>
    </PaperProvider>
  )
}
