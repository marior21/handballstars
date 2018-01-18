import * as firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDxZS-mhYE6Meie6_bHq017DaZBKcBpckM",
    authDomain: "handballstars-920a4.firebaseapp.com",
    databaseURL: "https://handballstars-920a4.firebaseio.com",
    projectId: "handballstars-920a4",
    storageBucket: "handballstars-920a4.appspot.com",
    messagingSenderId: "287949298112"
})

export const db = firebaseApp.database()
