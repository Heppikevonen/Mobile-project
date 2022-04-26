import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
import styles from '../styles/styles';
import theme from '../styles/Theme';
import {db, ROOT_REF_SONG_REQUESTS} from '../firebase/Config';

const SongRequest = () => {

  const { colors } = useTheme(theme);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [songName, setSongName] = useState('');
  const [reason, setReason] = useState('');

  const submit = () => {
    if(firstName.trim() && lastName.trim() && email.trim() && songName.trim() && reason.trim() !== ""  ) {
    db.ref(ROOT_REF_SONG_REQUESTS).push({
            Firstname: firstName,
            Lastname: lastName,
            Email: email,
            Songname: songName,
            Reason: reason,
    });
    setFirstName('');
    setLastName('');
    setEmail('');
    setSongName('');
    setReason('');
  } else {
    createOneButtonAlert();

  }
};

const createOneButtonAlert = () => Alert.alert (
  "Invalid values","Please check your data and try it again", 
  {
    text: "Ok",
    onPress: () => console.log("Ok pressed"),
  },
  {cancelable: false}
)

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setEmail(text);
      return false;
    }
    else {
      this.setEmail(text);
      console.log("Email is Correct");
    }
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView >
          <TextInput
            label='First name'
            mode='outlined'
            keyboardType='default'
            value={firstName}
            onChangeText={setFirstName}
            style={styles.textInput}
          />
          <TextInput
            label='Last name'
            mode='outlined'
            keyboardType='default'
            value={lastName}
            onChangeText={setLastName}
            style={styles.textInput}
          />
          <TextInput
            label='Email address'
            mode='outlined'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            
          />
          <TextInput
            label='Songname and artist'
            mode='outlined'
            keyboardType='default'
            value={songName}
            onChangeText={setSongName}
            style={styles.textInput}
          />
          <TextInput
            label='Reason for song'
            mode='outlined'
            keyboardType='default'
            value={reason}
            onChangeText={setReason}
            style={styles.textInput}
            //multiline='true'
            numberOfLines={5}
          />
          <Button
            mode='contained'
            style={styles.buttonSmall}
            //icon='submit'
            onPress={submit}
          >Submit
          </Button>
         </ScrollView>
      </View>
    </PaperProvider>
  )
}

export default SongRequest




