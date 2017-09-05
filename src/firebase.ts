import * as firebase from 'firebase/app';
import 'firebase/database';

export interface DataSnapshot<T> extends firebase.database.DataSnapshot {
  val(): T;
}

export function initializeFirebaseApp() {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  });
}
