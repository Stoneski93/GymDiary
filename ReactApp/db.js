import firebase from 'firebase';

const config = {
  apiKey: ' AIzaSyBdCyS6v6tnwntU2TzyLZXse8uW4dMnaZ0',
  authDomain: 'gymapp-7b1ac.firebaseio.com',
  databaseURL: 'https://gymapp-7b1ac.firebaseio.com/',
  storageBucket: "gymapp-7b1ac.appspot.com",
  messagingSenderId: "999399818291",
};

firebase.initializeApp(config);
const storage = firebase.storage();
export const database = firebase.database();
export const firebaseAuth = firebase.auth();
export const storageRef = storage;