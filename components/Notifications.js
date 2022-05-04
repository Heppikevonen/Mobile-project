import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { db } from '../firebase/Config';
import { firebase } from '@react-native-firebase/functions';
import { getFunctions, httpsCallable } from "firebase/functions";

async function sendNotification() {
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    await notifee.displayNotification({
        title: 'title',
        body: 'notification body',
        android: {
            channelId,
        },
    });
}

async function saveToken() {
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();

    db.ref('/tokens').orderByChild('token').equalTo(token).once('value', snapshot => {
        if (snapshot.exists()) {
            //console.log(snapshot.val());    
        }
        else {
            db.ref('/tokens').push({
                token: token,
            })
                .then(() => console.log('Data set'));
        }
    });   
}
export const msgToken = saveToken()
//export const msgReceive = sendNotification()