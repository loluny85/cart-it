import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB27pyFO_M_rjo-aFbWmDEO1nzDSuT3bDU",
    authDomain: "cartit-80c88.firebaseapp.com",
    projectId: "cartit-80c88",
    storageBucket: "cartit-80c88.appspot.com",
    messagingSenderId: "376848670373",
    appId: "1:376848670373:web:4c559d345445049850f74c"
}

const fire = firebase.initializeApp(firebaseConfig)

export default fire;