import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, Pressable } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import { db, ROOT_REF_RSS } from '../firebase/Config'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Provider as PaperProvider, useTheme } from 'react-native-paper'
//import { registerRootComponent } from 'expo';
import styles from '../styles/styles'
import theme from '../styles/Theme'
import Search from '../components/Search'
//import DataRSSFeed from '../constants/DataRSSFeed';

// db.ref(ROOT_REF).push({
//   link: "https://feeds.npr.org/510298/podcast.xml",
//   category: ['personal development', 'sports'],

// })

export default function PodcastOverview ({ navigation }) {
  const { colors } = useTheme(theme)
  const [data, setData] = useState('')
  const [dataRSSFeed, setDataRSSFeed] = useState([{}])
  const [category, setCategory] = useState([])
  const [rssItems, setRssItems] = useState([])

  useEffect(() => {
    db.ref(ROOT_REF_RSS).on('value', querySnapShot => {
      let dataTemp = querySnapShot.val() ? querySnapShot.val() : {}
      let data = { ...dataTemp }
      setData(data)

      //console.log(data);

      if (Object.keys(data).length != Object.keys(dataRSSFeed).length) {
        for (let i = 0; i < Object.values(data).length; i++) {
          //console.log(Object.values(data)[i].link);
          setCategory(arr => [...arr, Object.values(data)[i].category])
          // console.log(category[i]);

          fetch(Object.values(data)[i].link)
            .then(response => response.text())
            .then(responseData => rssParser.parse(responseData))
            .then(rss => {
              setDataRSSFeed(arr => [
                ...arr,
                {
                  title: `${rss.title}`,
                  imageUrl: `${rss.image.url}`,
                  author: `${rss.authors}`,
                  description: `${rss.description}`,
                  items: rss.items
                }
              ])
              // setRssItems(arr => [...arr, rss.items])
            })
            .catch(err => console.log(err))
        }
      }
    })
  }, [])

  const keysArrays = Object.keys(dataRSSFeed).reduce(function (
    rows,
    key,
    index
  ) {
    return (
      (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    )
  },
  [])

  // const executeSearch = (search) => {
  //   const searchArray = title.filter((title) => title.startsWith(search));
  //   setTitle(searchArray);
  // }
  // console.log(rssItems[1].title)

  // console.log(keysArrays)

  let key = Object.keys(dataRSSFeed)
  //console.log(dataRSSFeed);
  //console.log(titleImages);
  //console.log(DataRSSFeed.getData());
  //console.log(titleKey);
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Search></Search>

        <ScrollView>
          {key.length > 0 ? (
            keysArrays.map(row => (
              <Row key={row} id={row}>
                {row.map(col => (
                  <Col key={col} id={col}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('podcastreview', {
                          image: dataRSSFeed[col].imageUrl,
                          title: dataRSSFeed[col].title,
                          description: dataRSSFeed[col].description,
                          items: dataRSSFeed[col].items
                        })
                      }
                    >
                      <Image
                        style={styles.tinyLogo}
                        source={{ uri: `${dataRSSFeed[col].imageUrl}` }}
                      ></Image>
                      <Text
                        style={[
                          styles.podcastHeadline,
                          { color: colors.accent }
                        ]}
                        numberOfLines={3}
                      >
                        {' '}
                        {dataRSSFeed[col].title}
                      </Text>
                    </Pressable>

                    {/* <Text style={[styles.headline, { color: colors.primary }]}>{category[col]}</Text> */}
                  </Col>
                ))}
              </Row>

              // <Grid >
              //   <Col key={key} id={key}>
              //     <Image style={styles.tinyLogo} source={{uri: `${imageURL[key]}`}}></Image>
              //     <Text style={[styles.headline, { color: colors.primary }]}> {title[key]}</Text>
              //     <Text style={[styles.headline, { color: colors.primary }]}>{category[key]}</Text>
              //   </Col>
              //   <Col key={key} id={key}>
              //     <Image style={styles.tinyLogo} source={{uri: `${imageURL[key + 1]}`}}></Image>
              //     <Text style={[styles.headline, { color: colors.primary }]}> {title[key]}</Text>
              //     <Text style={[styles.headline, { color: colors.primary }]}>{category[key]}</Text>
              //   </Col>
              // </Grid>
            ))
          ) : (
            <Text style={styles.infoText}>There are no items</Text>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  )
}

//registerRootComponent(App);
