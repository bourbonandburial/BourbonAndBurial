import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');

    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  err => Promise.reject('error on token request', err),
);

axios.interceptors.response.use(
  response => response,
  (errorResponse) => {
    console.error('Error happened during Authentication', errorResponse);
  },
);

const getCurrentUserJwt = () => firebase
  .auth()
  .currentUser.getIdToken()
  .then(token => sessionStorage.setItem('token', token));

const googleAuth = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(getCurrentUserJwt);
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

const getDisplayName = () => {
  return firebase.auth().currentUser.displayName;
};

const getEmail = () => {
  return firebase.auth().currentUser.email;
};

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export default { getUid, getCurrentUserJwt, googleAuth, logoutUser, getDisplayName, getEmail, getCurrentUser };
