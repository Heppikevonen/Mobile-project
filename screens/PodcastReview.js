import { View, Image, BackHandler, Pressable } from 'react-native'
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

export default function PodcastReview ({ route, navigation }) {
  const { image, description } = route.params
  const [showMore, setShowMore] = useState(false)

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

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Grid>
          <Row style={styles.podcastHeader} size={25}>
            <Col size={50}>
                <Image style={styles.podcastImage} source={{ uri: image }} />
            </Col>
            <Col size={50}>
              <Text style={styles.smallDescription}>
                {!showMore ? description.substring(0, 175) + '...' : null}
                <Pressable
                  style={styles.showMoreButton}
                  onPress={() => setShowMore(!showMore)}
                >
                  <Text style={styles.showMoreText}>
                    {!showMore ? 'Show more' : null}
                  </Text>
                </Pressable>
              </Text>
            </Col>
          </Row>
          <Divider />
          {showMore ? (
            <Row size={75}>
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
            </Row>
          ) : null}
        </Grid>
      </View>
    </PaperProvider>
  )
}
