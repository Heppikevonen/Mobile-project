import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Modal,
  Pressable
} from 'react-native'
import RNPoll from 'react-native-poll'
import RNAnimated from 'react-native-animated-component'
import { db, ROOT_REF_POLL1, ROOT_REF_POLL1_RESULTS } from '../firebase/Config'
import styles from '../styles/styles'
import theme from '../styles/Theme'

const { width: ScreenWidth } = Dimensions.get('window')



export default function Poll () {
  const [modalVisible, setModalVisible] = useState(false)
  const [pollData, setPollData] = useState([]);
  const [choices, setChoices] = useState([]);
  const [userChoice, setUserChoice] = useState([]);
  const [voted, setVoted] = useState(false); 
  let vote1 = 0; 

  //let choices = []

  useEffect(() => {
    db.ref(ROOT_REF_POLL1).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      setPollData(data);
  
      setChoices( [
        { id: 1, choice: data.answer1, votes: 5 },
        { id: 2, choice: data.answer2, votes: 7 },
        { id: 3, choice: data.answer3, votes: 1 },
        { id: 4, choice: data.answer4, votes: 5 },
        { id: 5, choice: data.answer5, votes: 9 }
      ])
      
    }
    );
  }, [])

  const sendChoiceToDB = (choice) => {
    db.ref(ROOT_REF_POLL1_RESULTS).push({
      choice: choice.choice,
});
  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <Pressable
        style={styles.buttonSmall}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show poll</Text>
      </Pressable>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {voted ? (
              <>
              <Text
              style={{
                marginTop: 32,
                fontSize: 20,
                fontFamily: 'sans-serif'
              }}
            >
              Thanks for having participated in the survey! 
              
            </Text>
            <Text style={{marginTop: 10, fontSize: 16, fontFamily: 'sans-serif' }}>Your choice for the question "{pollData.question}" was: {userChoice.choice}</Text>
            </>
            ) : (
              <>
              <Text
              style={{
                marginTop: 32,
                fontSize: 20,
                fontFamily: 'sans-serif'
              }}
            >
              {pollData.question}
            </Text>
            <RNPoll
              appearFrom='top'
              totalVotes={30}
              animationDuration={500}
              choices={choices}
              PollContainer={RNAnimated}
              PollItemContainer={RNAnimated}
              choiceTextStyle={{
                fontFamily: 'sans-serif'
              }}
              onChoicePress={selectedChoice =>
                {setUserChoice(selectedChoice); sendChoiceToDB(selectedChoice); setVoted(true)}
              }
            />
            </>
            )}
            <Pressable
              style={voted? styles.buttonVoted : styles.buttonVote}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide survey</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
