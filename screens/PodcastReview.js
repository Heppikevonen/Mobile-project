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
  Text,
  TextInput
} from 'react-native-paper'
import { Col, Row, Grid } from 'react-native-easy-grid'
import theme from '../styles/Theme'
import styles from '../styles/styles'
import EpisodeList from '../components/EpisodeList'
import DropDownPicker from 'react-native-dropdown-picker'
import { AntDesign } from '@expo/vector-icons';

export default function PodcastReview ({ route, navigation }) {
  const { image, description, items } = route.params
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState(items);
  const [dataSearch, setDataSearch] = useState(items);
  const [orderByopen, setOrderByOpen] = useState(false);
  const [orderByvalue, setOrderByValue] = useState('newest');
  const [orderByItems, setOrderByItems] = useState([
    {label: 'Newest first', value: 'newest'},
    {label: 'Oldest first', value: 'oldest'}
  ]);
  const [durationValue, setDurationValue] = useState(null);

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

  const sortByDate = () => {
    if (orderByvalue === 'oldest') {
      let sorted = dataSearch.sort((a, b) => new Date(...a.published.split('/').reverse()) - new Date(...b.published.split('/').reverse()))
        .map((items) => (items));
      setDataSearch(sorted); 
    } else {
      let sorted = dataSearch.sort((a, b) => new Date(...b.published.split('/').reverse()) - new Date(...a.published.split('/').reverse()))
        .map((items) => (items));;
      setDataSearch(sorted); 
    }
  }

  const durationFilter = (value) => {

    if (value === '') {
      setDataSearch(data); 
      setOrderByValue('newest');
    } else if (data[0].itunes.duration.includes(':') === false){
      const dataDuration = data.filter(item => Math.round(item.itunes.duration / 60) >= value) 
        .map((items) => (items));
      setDataSearch(dataDuration); 
      sortByDate;
    } else if (data[0].itunes.duration.length < 6) {
      const dataDuration = data.filter(item => 
          Math.round(
            parseInt(item.itunes.duration.substring(0, 2)) + 
            parseInt(item.itunes.duration.substring(3, 4) / 60)) >= value) 
        .map((items) => (items));
      setDataSearch(dataDuration); 
      sortByDate;
       } else {
        const dataDuration = data.filter(item => 
          Math.round(
            parseInt(item.itunes.duration.substring(0, 2)) * 60 + 
            parseInt(item.itunes.duration.substring(3, 5)) +
            parseInt(item.itunes.duration.substring(3, 5) / 60)) >= value) 
        .map((items) => (items));
      setDataSearch(dataDuration); 
      sortByDate;
      //   const dataDuration = dataSearch.filter(item => 
      //     Math.round(item.itunes.duration.substring(0, 2) * 60 + item.itunes.duration.substring(3, 5) / 60) > value) 
      //   .map((items) => (items));
      // setDataSearch(dataDuration); 


    }

    // let hours = parseInt(duration.substring(0, 2))
    //   let minutes = parseInt(duration.substring(3, 5))
    //   let seconds = parseInt(duration.substring(6, 8))
    //   let formatted = Math.round(minutes + hours * 60 + seconds / 60)
    //   return formatted

    // {!item.itunes.duration.includes(':')
    //               ? Math.round(item.itunes.duration / 60) + ' minutes'
    //               : Math.round(durationFormatter(item.itunes.duration)) + ' minutes'}
    

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
            <View style={styles.dropDownPodcastReview}>
              <DropDownPicker
                open={orderByopen}
                value={orderByvalue}
                items={orderByItems}
                setOpen={setOrderByOpen}
                setValue={setOrderByValue}
                setItems={setOrderByItems}
                onChangeValue={sortByDate}
              />
              </View>
            </Col>
            <Col size={5} />
            <Col size={50}>
              <View style={styles.textInputDuration}>
              <TextInput
                label="Min. duration"
                mode="outlined"
                keyboardType="number-pad"
                value={durationValue}
                onChangeText={setDurationValue}
                // style={[{height: Math.max(50)}]}
                onSubmitEditing={() => durationFilter(durationValue)}
                right={<TextInput.Icon name={() => <AntDesign name="closecircleo" size={24} color={theme.onSurface}/>}  
                  onPress={() => {setDurationValue(''); durationFilter('')}} />}
          />
              </View>
            </Col>
          </Row>
          <Row size={showMore ? 25 : 50}>
          <Col>
              <View style={styles.dropDown}>
                <EpisodeList data={dataSearch} initialNumToRender={5} />
              </View>
            </Col>
          </Row>
        </Grid>
        
      </View>
    </PaperProvider>
  )
}
