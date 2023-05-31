import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC2gsDkIuoFxG7JN0KsMV7vT99e617fHuE",
    authDomain: "miprimerproyecto-8121e.firebaseapp.com",
    projectId: "miprimerproyecto-8121e",
    storageBucket: "miprimerproyecto-8121e.appspot.com",
    messagingSenderId: "629012486344",
    appId: "1:629012486344:web:701fb6f77cf79db0b4adfd"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

