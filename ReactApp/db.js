import firebase from 'firebase';

const config = {
  apiKey: ' AIzaSyBdCyS6v6tnwntU2TzyLZXse8uW4dMnaZ0',
  authDomain: 'gymapp-7b1ac.firebaseio.com',
  databaseURL: 'https://gymapp-7b1ac.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;