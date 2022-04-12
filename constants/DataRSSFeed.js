import React, { useEffect, useState } from 'react';
import * as rssParser from 'react-native-rss-parser';
import { db, ROOT_REF_RSS } from '../firebase/Config';



 const DataRSSFeed = () => {

 function getData () {

     const [dataFromDatabase, setDataFromDatabase] = useState('');
     const [dataRSSFeed, setDataRSSFeed] = useState([{}]);
     
    
    
    useEffect(() => {
        db.ref(ROOT_REF_RSS).on('value', querySnapShot => {
          let dataTemp = querySnapShot.val() ? querySnapShot.val() : {};
          let data = { ...dataTemp };
          setDataFromDatabase(data);
          

          
        if (Object.keys(dataFromDatabase).length != Object.keys(dataRSSFeed).length){

            for (let i = 0; i < Object.values(dataFromDatabase).length; i++) {
              //console.log(Object.values(data)[i].link);
              //setCategory(arr => [...arr, Object.values(data)[i].category]); 
      
              fetch(Object.values(dataFromDatabase)[i].link)
                .then((response) => response.text())
                .then((responseData) => rssParser.parse(responseData))
                .then((rss) => {
                  setDataRSSFeed(arr => [...arr, {
                      title: `${rss.title}`, 
                      imageURL: `${rss.image.url}`,
                      authors: `${rss.authors}`}]);
                  
                })
                .catch((err) => console.log(err));
            }
          }
          
          
        });
      }, []);
      return dataRSSFeed; 

      //return dataRSSFeed; 

      
}
}

export default DataRSSFeed; 



