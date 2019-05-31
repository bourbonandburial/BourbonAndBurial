import firebase from 'firebase/app';
import 'firebase/auth';
import constants from '../constants';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(constants.firebaseConfig);
  }
};

export default firebaseApp;
