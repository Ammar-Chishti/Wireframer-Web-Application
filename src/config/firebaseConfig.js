import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyASg-3mC-XXGCV2VLjrYjideHFTYAwi5vE",
    authDomain: "cse-316-homework3.firebaseapp.com",
    databaseURL: "https://cse-316-homework3.firebaseio.com",
    projectId: "cse-316-homework3",
    storageBucket: "cse-316-homework3.appspot.com",
    messagingSenderId: "420873396327",
    appId: "1:420873396327:web:dfa2f12cb7e0393bcab4c2"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;