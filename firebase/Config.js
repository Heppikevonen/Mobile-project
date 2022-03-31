import firebase from 'firebase/compat'; 

const firebaseConfig = ({
    apiKey: "AIzaSyAjbm-EXyi3BAKwZ__vevAH6ARBFI0MdPc",
    authDomain: "runnerradiorssfeed.firebaseapp.com",
    projectId: "runnerradiorssfeed",
    storageBucket: "runnerradiorssfeed.appspot.com",
    messagingSenderId: "444533911736",
    appId: "1:444533911736:web:60771b23d03d41f743844d",
    databaseURL: "https://runnerradiorssfeed-default-rtdb.europe-west1.firebasedatabase.app/",
});

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database(); 
export const ROOT_REF = '/rss';