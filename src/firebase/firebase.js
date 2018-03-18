const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


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
firebase.firestore().enablePersistence()
    .then(function () {
        // Initialize Cloud Firestore through firebase
        console.log("firebase persistence initiated")
    })
    .catch(function (err) {
        if (err.code === 'failed-precondition') {
            console.log(err)
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code === 'unimplemented') {
            console.log(err)
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
const db = firebase.firestore();

export {
    auth,
    db
};