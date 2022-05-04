import { View, Image, BackHandler, Pressable, ScrollView } from 'react-native'
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
import DropDownPicker from 'react-native-dropdown-picker';

export default function PodcastReview ({ route, navigation }) {
  const { image, description, items } = route.params
  const [showMore, setShowMore] = useState(false)
  const DATA = items
  const [orderByopen, setOrderByOpen] = useState(false);
  const [orderByvalue, setOrderByValue] = useState(null);
  const [orderByItems, setOrderByItems] = useState([
    {label: 'Downloaded', value: 'downloaded'},
    {label: 'Newest first', value: 'newest'},
    {label: 'Oldest first', value: 'oldest'}
  ]);
  const [durationOpen, setDurationOpen] = useState(false);
  const [durationValue, setDurationValue] = useState(null);
  const [durationItems, setDurationItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

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
          <Row style={styles.podcastHeader} size={30}>
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
                  <Text>
                    {!showMore ? description.substring(0, 175) : null}
                  </Text>
                )}
              </Text>
            </Col>
          </Row>
          {showMore ? (
            <Row size={40}>
              <ScrollView style={styles.descriptionScroll}>
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
          <Row size={10}>
            <Col size={45}>
              <DropDownPicker
                open={orderByopen}
                value={orderByvalue}
                items={orderByItems}
                setOpen={setOrderByOpen}
                setValue={setOrderByValue}
                setItems={setOrderByItems}
              />
            </Col>
            <Col size={10} />
            <Col size={45}>
              <DropDownPicker
                open={durationOpen}
                value={durationValue}
                items={durationItems}
                setOpen={setDurationOpen}
                setValue={setDurationValue}
                setItems={setDurationItems}
              />
            </Col>
          </Row>
          <Row size={showMore ? 25 : 50}>
            <Col>
              <EpisodeList data={DATA} initialNumToRender={5} />
            </Col>
          </Row>
        </Grid>
      </View>
    </PaperProvider>
  )
}
