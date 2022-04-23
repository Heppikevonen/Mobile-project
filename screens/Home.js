import React, { useEffect, useState } from "react"
import {Text, ScrollView, ImageBackground, View} from "react-native" 
import { Provider as PaperProvider, useTheme, List, Divider, Button } from 'react-native-paper'
import styles from '../styles/styles'
import theme from '../styles/Theme'
import { db, ROOT_REF_NEWS, ROOT_REF_UPCOMING_BROADCASTS, ROOT_REF_HEADER } from '../firebase/Config'

export default function Home() {
    const { colors } = useTheme(theme);
    const [expanded, setExpanded] = React.useState(true);
    const [news, setNews] = useState([]); 
    const [upcomingBroadcasts, setUpcomingBroadcasts] = useState([]); 
    const [header, setHeader] = useState([]); 

    const handlePress = () => setExpanded(!expanded);

    const image = { uri: "https://runner-radio.de/wp-content/uploads/2022/02/one-run-one-book.jpg" };
    const image2 = { uri: "https://runner-radio.de/wp-content/uploads/2022/02/strandlauf.jpg" };

    useEffect(() => {
      db.ref(ROOT_REF_NEWS).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setNews(data);
      }
      );
      db.ref(ROOT_REF_UPCOMING_BROADCASTS).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setUpcomingBroadcasts(data);
      }
      );
      db.ref(ROOT_REF_HEADER).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        setHeader(data);
      }
      );
    }, []);

  let keyNews = Object.keys(news);
  let keyUpcomingBroadcasts = Object.keys(upcomingBroadcasts);
  
  return (
      <PaperProvider theme={theme}>
          {/* <View style={styles.container}>  */}
           <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={[styles.textImage, {color: colors.onPrimary}]}>
              {header.title1} {"\n"} 
              {header.title2}
            </Text>
            <View>
            <Button 
                //icon="music" 
                mode="contained" 
                onPress={() => console.log('Pressed')}
                disabled={header.buttonActive}
                uppercase={false}
                style={styles.buttonSmall}
                >
                Listen now
            </Button>
            </View>
           </ImageBackground>
           <ScrollView>
        <List.Section title="Upcoming broadcasts" titleStyle={styles.textAccordion}>
        {keyUpcomingBroadcasts.length > 0 ? (
          keyUpcomingBroadcasts.map(key => (
            <List.Accordion
            key={key}
            id={key}
            titleNumberOfLines={upcomingBroadcasts[key].titleNumberOfLines}
            title={upcomingBroadcasts[key].title}
            description={upcomingBroadcasts[key].description}
            descriptionNumberOfLines={upcomingBroadcasts[key].descriptionNumberOfLines}
            left={props => <List.Icon {...props} icon={upcomingBroadcasts[key].icon}/>}>
            <List.Item 
                titleNumberOfLines={upcomingBroadcasts[key].itemNumberOfLines}
                title={upcomingBroadcasts[key].detailedDescription} />
            </List.Accordion>
          ))
        ) : (
          <Text style={styles.infoText}>There are no news available right now</Text>
        )}
          </List.Section>

          <List.Section title="News" titleStyle={styles.textAccordion}>         
          {keyNews.length > 0 ? (
          keyNews.map(key => (
            <List.Accordion
            key={key}
            id={key}
            titleNumberOfLines={news[key].titleNumberOfLines}
            title={news[key].title}
            description={news[key].description}
            descriptionNumberOfLines={news[key].descriptionNumberOfLines}
            left={props => <List.Icon {...props} icon={news[key].icon}/>}
            >
            <List.Item 
                titleNumberOfLines={news[key].itemNumberOfLines}
                title={news[key].detailedDescription} />
            </List.Accordion>
          
          ))
        ) : (
          <Text style={styles.infoText}>There are no news available right now</Text>
        )}

          {/* <List.Accordion
            title="Controlled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion> */}
        </List.Section>
        </ScrollView>
        {/* </View> */}
      </PaperProvider>
  )
}