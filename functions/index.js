const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { Message } = require("firebase-functions/v1/pubsub");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://runnerradiorssfeed-default-rtdb.europe-west1.firebasedatabase.app/',
  });

const NTFtoken = admin.database().ref('/tokens').once('value');

exports.sendNotification = 
    functions
    .region('europe-west1')
    .https
    .onCall((data, context) => {
      console.log('Event triggered');
      const payload = {
        token: NTFtoken,
      notification: {
        title: 'title',
        body: 'body'
      }
      }
      return admin.messaging().sendMulticast(payload);
    });
  
    

    
    
    

  