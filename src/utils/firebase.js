import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADWdpd9InS1S_1zKq97oEAIeCA9gy98aQ",
    authDomain: "e-clone-1289a.firebaseapp.com",
    projectId: "e-clone-1289a",
    storageBucket: "e-clone-1289a.appspot.com",
    messagingSenderId: "9418900251",
    appId: "1:9418900251:web:34bc9a97ac65fc3e7149be",
    measurementId: "G-37MSTH5899"
  }; 

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth}
