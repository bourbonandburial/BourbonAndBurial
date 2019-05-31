import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  return response;
}, errorResponse => {
  console.error("Blew up")
});

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    cred.user.getIdToken()
    .then(token => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default { getUid, loginUser, logoutUser, registerUser };
