// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBTD0XhNscDlvy4ruBfQYon3O-97AN4qNw",
    authDomain: "clone-c3164.firebaseapp.com",
    projectId: "clone-c3164",
    storageBucket: "clone-c3164.appspot.com",
    messagingSenderId: "576598208375",
    appId: "1:576598208375:web:1a908654462e8dcdc3bb72",
    measurementId: "G-XC0HN6T6M2"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  export {db,auth};
  