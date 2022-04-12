import { View, Text, Image, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Provider as PaperProvider, useTheme } from 'react-native-paper'
import { Col, Row, Grid } from 'react-native-easy-grid'
import theme from '../styles/Theme'
import styles from '../styles/styles'

export default function PodcastReview ({ route, navigation }) {
  const { image, description } = route.params

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
          <Row>
            <Col>
              <Image style={styles.tinyLogo} source={{ uri: image }} />
            </Col>
            <Col>
              <Text>
                {description}
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    </PaperProvider>
  )
}
