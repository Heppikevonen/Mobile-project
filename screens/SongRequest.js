import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, useTheme } from 'react-native-paper';
import styles from '../styles/styles';
import theme from '../styles/Theme';
import {db, ROOT_REF_SONG_REQUESTS} from '../firebase/Config';
import { AntDesign } from '@expo/vector-icons';


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
    Alert.alert(
      "Thank you!",
      "Your song request has been successfully submitted. If it fits the show, you might hear it soon. Stay tuned and keep running :)",
      [
        { text: "OK" }
      ]
    );
  } else {
    Alert.alert(
      "Missing information",
      "There are some necessary information missing. Please check the form again!",
      [
        { text: "OK", colors: 'orange' }
      ]
    );

  }
};


 const validate = val => {
  console.log(val);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (val.length === 0) {
    Alert.alert(
      "Email address must be entered",
      "Please fill in your email address",
      [
        { text: "OK" }
      ]
    );
  } else if (reg.test(val) === false) {
    Alert.alert(
      "Invalid Email",
      "Please enter a valid email address",
      [
        { text: "OK" }
      ]
    );
  } else if (reg.test(val) === true) {
    setEmail(val); 
  }
  };




//   if (reg.test(text) === false) {
//     console.log("Email is Not Correct");
//     Alert.alert(
//       "Invalid email",
//       "Your email address is not correct. Please try it again.",
//       [
//         { text: "OK", onPress: () => console.log("OK Pressed") }
//       ]
//     );
//     return false;
//   }
//   else {
//     setEmail(text);
//     console.log("Email is Correct");
//   }
// }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={[styles.textLargeLabel, { alignSelf: "center" }]}>
            Do you want to hear a specific song on the show?
          </Text>
          <Text style={[styles.textMediumBody, { alignSelf: "center" }]}>
            Feel free to fill in the form below with the song you would love to
            hear on the show. If it fits in the program you might hear your
            favorite song on Radio Runner.
          </Text>
          <TextInput
            label="First name"
            mode="outlined"
            keyboardType="default"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.textInput}
            right={<TextInput.Icon name={() => <AntDesign name="closecircleo" size={24} color={colors.onSurface}/>}  onPress={() => setFirstName('')} />}
            // right={<TextInput.Icon name={<AntDesign name="closecircleo"/>} onPress={() => setFirstName('')} />}
            // <AntDesign name="closecircleo" size={24} color="black" />
            
            
          />
          <TextInput
            label="Last name"
            mode="outlined"
            keyboardType="default"
            value={lastName}
            onChangeText={setLastName}
            style={styles.textInput}
          />
          <TextInput
            label="Email address"
            mode="outlined"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            // onSubmitEditing={value => 
            //   validate(value)
            // }
            style={styles.textInput}
          />
          <TextInput
            label="Songname and artist"
            mode="outlined"
            keyboardType="default"
            value={songName}
            onChangeText={setSongName}
            style={styles.textInput}
          />
          <TextInput
            label="Reason for song"
            mode="outlined"
            keyboardType="default"
            value={reason}
            onChangeText={setReason}
            style={styles.textInput}
            //multiline='true'
            numberOfLines={5}
          />
          <Button
            mode="contained"
            style={[styles.buttonSmall, {alignSelf: 'center', marginBottom: 30}]}
            //icon='submit'
            onPress={submit}
            dark={true}
          >
            Submit
          </Button>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

export default SongRequest




