import {getApp, getApps, initializeApp} from "firebase/app"

import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCS--3sIzwp74Qim08OvCnMIubNGtMp4xo",
    authDomain: "insta-d1dee.firebaseapp.com",
    projectId: "insta-d1dee",
    storageBucket: "insta-d1dee.appspot.com",
    messagingSenderId: "40488352330",
    appId: "1:40488352330:web:1971218b9ed3926c30c4b3"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  const storage = getStorage();

  export {app, db, storage};