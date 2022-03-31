import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import { db, ROOT_REF } from '../firebase/Config';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
//import { registerRootComponent } from 'expo';
import styles from '../style/Style';
import theme from '../style/Theme';


export default function App() {
    const { colors } = useTheme(theme);
    const [data, setData] = useState('');
    const [title, setTitle] = useState([]);
    const [category, setCategory] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    
    useEffect(() => {
      db.ref(ROOT_REF).on('value', querySnapShot => {
        let dataTemp = querySnapShot.val() ? querySnapShot.val() : {};
        let data = { ...dataTemp };
        setData(data);
        console.log(data);
  
        for (let i = 0; i < Object.values(data).length; i++) {
          console.log(Object.values(data)[i].link);
          setCategory(arr => [...arr, Object.values(data)[i].category]); 
  
          fetch(Object.values(data)[i].link)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
              setTitle(arr => [...arr, rss.title]); 
              console.log(title);           
              console.log(rss.title);
              console.log(rss.items.length);
              console.log(rss.image.url);
              setImageURL(arr => [...arr, rss.image.url]); 
              console.log(imageURL);
              //setImageURL(rss.image.url);
            })
            .catch((err) => console.log(err));
        }
      });
    }, []);
   
    let titleKey = Object.keys(title);
    console.log(titleKey);
    return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>  
        <ScrollView>
          {titleKey.length > 0 ? (
            titleKey.map(key => (
              <View  key={key} id={key}>
                  <Image style={styles.tinyLogo} source={{uri: `${imageURL[key]}`}}></Image>
                  <Text style={[styles.headline, { color: colors.primary }]}> {title[key]}</Text>
                  <Text style={[styles.headline, { color: colors.primary }]}>{category[key]}</Text>
              </View>           
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