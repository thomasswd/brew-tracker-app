import * as firebase from 'firebase/app'
//import app from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

export const app = firebase.initializeApp({
    apiKey: "AIzaSyDlvnLAIZa7Qk1Mx32jxHY8wFQcvVON7z0",
    authDomain: "brew-timer-72db3.firebaseapp.com",
    databaseURL: "https://brew-timer-72db3.firebaseio.com",
    projectId: "brew-timer-72db3",

})

export const auth = firebase.auth()

export const fireDB = firebase.firestore()

