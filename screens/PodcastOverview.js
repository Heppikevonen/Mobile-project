import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, Pressable } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import { db, ROOT_REF_RSS } from '../firebase/Config'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Provider as PaperProvider, useTheme } from 'react-native-paper'
//import { registerRootComponent } from 'expo';
import styles from '../styles/styles';
import theme from '../styles/Theme';
import Search from '../components/Search';
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

//import DataRSSFeed from '../constants/DataRSSFeed';

// db.ref(ROOT_REF_RSS).push({
//   link: "https://handelsblatt-morningbriefing.podigee.io/feed/mp3",
//   category: ['personal development', 'sports'],

// })

export default function PodcastOverview({ navigation }) {
  const { colors } = useTheme(theme);
  const [data, setData] = useState('');
  const [dataRSSFeed, setDataRSSFeed] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [orderBy, setOrderBy] = useState('1');
  const [filter, setFilter] = useState([]);
  const [showDropDownOrderBy, setShowDropDownOrderBy] = useState(false);
  const [showDropDownFilter, setShowDropDownFilter] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [filterList, setFilterList] = useState([
    { label: 'Books', value: 'books',  icon: () => <Ionicons name="book-outline" size={24} color={colors.accent} /> },
    { label: 'Education', value: 'education', icon: () => <Ionicons name="school-outline" size={24} color={colors.accent} /> },
    { label: 'Sports', value: 'sports', icon: () => <Ionicons name="basketball-outline" size={24} color={colors.accent} /> },
    { label: 'Music', value: 'music', icon: () => <Ionicons name="musical-note-outline" size={24} color={colors.accent} /> },
  ]);

  const [orderByList, setOrderByList] = useState([
    { label: 'Popularity', value: '1' },
    { label: 'A-Z', value: '2' },
    { label: 'Z-A', value: '3' },
  ]);

  useEffect(() => {
    if (isLoaded === false) {
      db.ref(ROOT_REF_RSS).on('value', querySnapShot => {
        let dataTemp = querySnapShot.val() ? querySnapShot.val() : {};
        let data = { ...dataTemp };
        setData(data);

        for (let i = 0; i < Object.values(data).length; i++) {
          fetch(Object.values(data)[i].link)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
              setDataRSSFeed(arr => [...arr, {
                title: `${rss.title}`,
                imageUrl: `${rss.image.url}`,
                author: `${rss.authors}`,
                description: `${rss.description}`,
                category: Object.values(data)[i].category,
                items: rss.items
              }]);
              setDataSearch(arr => [...arr, {
                title: `${rss.title}`,
                imageUrl: `${rss.image.url}`,
                author: `${rss.authors}`,
                description: `${rss.description}`,
                category: Object.values(data)[i].category,
                items: rss.items
              }]);

            })

            .catch((err) => console.log(err));
        }
        setIsLoaded(true);
      }
      );
    }
  }, []);

  const orderByFunction = (dataOrderBy) => {
    if (orderBy === '3') {
      const order = dataOrderBy.sort(function (a, b) {
        if (a.routes) return 1;
        if (b.routes) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        return 0;
      })
        .map(({ title, imageUrl, author, description, category }) => ({ title, imageUrl, author, description, category }));
      setDataSearch([]);
      setDataSearch(order);

    } else if (orderBy === '2') {
      const order = dataOrderBy.sort(function (a, b) {
        if (a.routes) return -1;
        if (b.routes) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      })
        .map(({ title, imageUrl, author, description, category }) => ({ title, imageUrl, author, description, category }));
      setDataSearch([]);
      setDataSearch(order);

    } else {
      const order = dataOrderBy.sort(function (a, b) { return 0.5 - Math.random() })
        .map(({ title, imageUrl, author, description, category }) => ({ title, imageUrl, author, description, category }));
      setDataSearch([]);
      setDataSearch(order);
    }
  }

  const keysArrays = Object.keys(dataSearch).reduce(function (rows, key, index) {
    return (index % 2 == 0 ? rows.push([key])
      : rows[rows.length - 1].push(key)) && rows;
  }, []);

  const executeSearch = (search) => {
    const searchArray = dataRSSFeed.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    setDataSearch(searchArray);
    orderByFunction;
    if (search === '') {
      setFilter([]); 
    }
  }

  const executeFilter = (filter) => {
    if (filter != '') {
      const filterArray = dataRSSFeed.filter(items => items.category.find(category => filter.includes(category)))
        .map(({ title, imageUrl, author, description, category }) => ({ title, imageUrl, author, description, category }));
      setDataSearch([]);
      setDataSearch(filterArray);
      orderByFunction(filterArray); 

    } else {
      setDataSearch(dataRSSFeed);
      orderByFunction(dataRSSFeed);
    }

  }


  let key = Object.keys(dataRSSFeed);
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Search
          executeSearch={executeSearch}
        //onIconPress={executeSearch('')}
        ></Search>
        <Grid>
          <Row>
            <Col size={45}>
              <View style={styles.dropDown}>
                <DropDownPicker
                  open={showDropDownOrderBy}
                  value={orderBy}
                  items={orderByList}
                  setOpen={setShowDropDownOrderBy}
                  setValue={setOrderBy}
                  setItems={setOrderByList}
                  onChangeValue={(value) => {
                    orderByFunction(dataSearch);
                  }}
                //zIndex={1000}
                />
              </View>
            </Col>
            <Col size={5}></Col>
            <Col size={45}>
              <View style={styles.dropDown}>
                <DropDownPicker
                  open={showDropDownFilter}
                  value={filter}
                  items={filterList}
                  multiple={true}
                  min={0}
                  //max={2}
                  setOpen={setShowDropDownFilter}
                  setValue={setFilter}
                  setItems={setFilterList}
                  onChangeValue={executeFilter}
                  placeholder="Filter by category"
                />
              </View>
            </Col>
          </Row>
        </Grid>
        <ScrollView style={styles.scrollView}>
          {key.length > 0 ? (
            keysArrays.map(row => (
              <Row key={row} id={row}>
                {row.map(col => (
                  <Col key={col} id={col}>
                    <Pressable onPress={() => navigation.navigate('podcastreview', { image: dataSearch[col].imageUrl, title: dataSearch[col].title, description: dataSearch[col].description, items: dataSearch[col].items })}>
                      <Image style={styles.tinyLogo} source={{ uri: `${dataSearch[col].imageUrl}` }}></Image>
                      <Text style={[styles.podcastHeadline, { color: colors.accent }]} numberOfLines={3}> {dataSearch[col].title}</Text>
                    </Pressable>

                    {/* <Text style={[styles.headline, { color: colors.primary }]}>{category[col]}</Text> */}
                  </Col>
                ))}
              </Row>
            ))
          ) : (
            <Text style={styles.infoText}>There are no items</Text>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  )
}

