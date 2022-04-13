import { View, Text, Image, BackHandler, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider as PaperProvider, useTheme } from 'react-native-paper'
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
            <Col>
              <Image style={styles.tinyLogo} source={{ uri: image }} />
            </Col>
            <Col>
              <Text>
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
          {showMore ? (
            <Row size={75}>
              <Col style={{}}>
                <Text>
                  {description}
                  <Pressable
                    style={styles.showMoreButton}
                    onPress={() => setShowMore(!showMore)}
                  >
                    <Text style={styles.showLessText}>
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
