import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCggBdG5HIvWzkr7SZCEOoGg5HX_ViZa74",
    authDomain: "projectmanagement-89ab1.firebaseapp.com",
    projectId: "projectmanagement-89ab1",
    storageBucket: "projectmanagement-89ab1.appspot.com",
    messagingSenderId: "337037300404",
    appId: "1:337037300404:web:ad25ddac3a04e7d1b7bde1"
};

// Init firebase
firebase.initializeApp(firebaseConfig)

// Initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }