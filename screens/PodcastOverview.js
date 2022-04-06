import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import { db, ROOT_REF } from '../firebase/Config';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
//import { registerRootComponent } from 'expo';
import styles from '../styles/styles';
import theme from '../styles/Theme';
import Search from '../components/Search';

db.ref(ROOT_REF).push({
  link: "https://feeds.npr.org/510298/podcast.xml",
  category: ['personal development', 'sports'],

})


export default function PodcastOverview() {
    const { colors } = useTheme(theme);
    const [data, setData] = useState('');
    const [titleImages, setTitleImages] = useState({});
    const [title, setTitle] = useState([]);
    const [category, setCategory] = useState([]);
    const [imageURL, setImageURL] = useState([]);

    
    
    useEffect(() => {
      db.ref(ROOT_REF).on('value', querySnapShot => {
        let dataTemp = querySnapShot.val() ? querySnapShot.val() : {};
        let data = { ...dataTemp };
        setData(data);
        //console.log(data);

        
        if (Object.keys(data).length != Object.keys(title).length){

          for (let i = 0; i < Object.values(data).length; i++) {
            //console.log(Object.values(data)[i].link);
            setCategory(arr => [...arr, Object.values(data)[i].category]); 
    
            fetch(Object.values(data)[i].link)
              .then((response) => response.text())
              .then((responseData) => rssParser.parse(responseData))
              .then((rss) => {
                //setTitleImages(arr => [...arr, {title: rss.title, url: rss.image.url}]);
                console.log(titleImages);
                setTitle(arr => [...arr, rss.title]); 
                //console.log(title);           
                //console.log(rss.title);
                //console.log(rss.items.length);
                //console.log(rss.image.url);
                setImageURL(arr => [...arr, rss.image.url]); 
                //console.log(imageURL);
                //setImageURL(rss.image.url);
              })
              .catch((err) => console.log(err));
          }
        }
        
        
      });
    }, []);

    

    const keysArrays = Object.keys(title).reduce(function (rows, key, index) { 
      return (index % 2 == 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows;
        
    }, []);

    // const executeSearch = (search) => {
    //   const searchArray = title.filter((title) => title.startsWith(search));
    //   setTitle(searchArray);
    // }
    
  console.log(keysArrays)

  
   
    let titleKey = Object.keys(title);
    //console.log(titleKey);
    return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>  
      <Search></Search>
      
        <ScrollView  >
          
          
          {titleKey.length > 0 ? (
            keysArrays.map(row => (
              <Row key={row} id={row} >
                {row.map(col => (
                <Col key={col} id={col}>
                  <Image style={styles.tinyLogo} source={{uri: `${imageURL[col]}`}}></Image>
                  <Text style={[styles.podcastHeadline, { color: colors.accent }]} numberOfLines={3}> {title[col]}</Text>
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
    );
  }

  //registerRootComponent(App);