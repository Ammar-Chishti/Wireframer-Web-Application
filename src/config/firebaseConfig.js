import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBHQ1JrjNYaU2iBrZXcZz1Gnyd_Mi-y1Uo",
  authDomain: "cse-316-final-project-98f10.firebaseapp.com",
  databaseURL: "https://cse-316-final-project-98f10.firebaseio.com",
  projectId: "cse-316-final-project-98f10",
  storageBucket: "cse-316-final-project-98f10.appspot.com",
  messagingSenderId: "604347760245",
  appId: "1:604347760245:web:bc4c2cf60c3ea69b62823c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;