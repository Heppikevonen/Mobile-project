import React from "react"
import {Text, View, ImageBackground} from "react-native" 
import { Provider as PaperProvider, useTheme, List, Divider } from 'react-native-paper'
import styles from '../styles/styles'
import theme from '../styles/Theme'

export default function Home() {
    const { colors } = useTheme(theme);
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
      <PaperProvider theme={theme}>
           <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
        <List.Section title="Upcoming broadcasts">
          <List.Accordion
            titleNumberOfLines={3}
            title="Sunday 17 April 2022  - 7:00 to 11:00"
            description="Beach run"
            descriptionNumberOfLines={5}
            left={props => <List.Icon {...props} icon="beach" />}>
            <List.Item 
                titleNumberOfLines={10} 
                title="The perfect start to the day, whether you’re running, lying on the couch or having your first to fifth coffee/tea. Calm, relaxed music accompanies us for 45 minutes and inbetween we hear the sound of the sea again and again." />
            
          </List.Accordion>

          <List.Accordion
            titleNumberOfLines={3}
            title="Sunday 24 April 2022 - 12:00 to 14:30 "
            description="One Book, One Run"
            descriptionNumberOfLines={5}
            left={props => <List.Icon {...props} icon="book"/>}>
            <List.Item 
                titleNumberOfLines={10} 
                title="The run that not only helps you in terms of sport. Suitable music for running and in between listening to the summary of an interesting book. 60 minutes just flew by." />
            
          </List.Accordion>
          </List.Section>

          <List.Section title="News">
          <List.Accordion
            titleNumberOfLines={3}
            title="Help me out"
            description="Which day do you prefere the podcast?"
            descriptionNumberOfLines={5}
            left={props => <List.Icon {...props} icon="help" />}>
            <List.Item 
                titleNumberOfLines={10} 
                title="The perfect start to the day, whether you’re running, lying on the couch or having your first to fifth coffee/tea. Calm, relaxed music accompanies us for 45 minutes and inbetween we hear the sound of the sea again and again." />
            
          </List.Accordion>

          <List.Accordion
            titleNumberOfLines={3}
            title="New podcast"
            description="The Jordan B Peterson Podcast 239 is out now!"
            descriptionNumberOfLines={5}
            left={props => <List.Icon {...props} icon="podcast"/>}>
            <List.Item 
                titleNumberOfLines={10} 
                title="The run that not only helps you in terms of sport. Suitable music for running and in between listening to the summary of an interesting book. 60 minutes just flew by." />
            
          </List.Accordion>
    
          {/* <List.Accordion
            title="Controlled Accordion"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion> */}
        </List.Section>
      </PaperProvider>
  )
}