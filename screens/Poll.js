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
import { db, POLL_REF } from '../firebase/Config'
import styles from '../styles/styles'

const { width: ScreenWidth } = Dimensions.get('window')

var choices = [
  { id: 1, choice: 'Rock', votes: 17 },
  { id: 2, choice: 'Pop', votes: 7 },
  { id: 3, choice: 'Metal', votes: 1 },
  { id: 4, choice: 'Rap', votes: 5 },
  { id: 5, choice: 'Bad', votes: 9 }
]

export default function Poll () {
  const [modalVisible, setModalVisible] = useState(false)
  // const [pollData, setPollData] = useState({})

  // useEffect(() => {
  //   db.ref(POLL_REF).on('value', querySnapShot => {
  //   let data = querySnapShot.val() ? querySnapShot.val() : {}
  //   let poll = {...data}
  //   setPollData(poll)
  //   console.log(data)
  //   })
  // }, [])
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
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
          <View
            style={styles.modalView}
          >
            <Text
            style={{
              marginTop: 32,
              fontSize: 20,
              fontFamily: 'sans-serif'
            }}
          >
            What type of music do you like?
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
                console.log('SelectedChoice: ', selectedChoice)
              }
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
