import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBRXM1lugsdV-ZimreIfjJlEEPVc-__gQo",
    authDomain: "notation-77d20.firebaseapp.com",
    databaseURL: "https://notation-77d20.firebaseio.com",
    projectId: "notation-77d20",
    storageBucket: "notation-77d20.appspot.com",
    messagingSenderId: "8088246861"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};