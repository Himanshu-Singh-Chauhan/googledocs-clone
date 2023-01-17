// import firebase from "firebase/compat/app";
import { initializeApp, getApp } from 'firebase/app';

import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAb-50dvwaYndEXxKI5UmPQyh9qy7VDqLc",
  authDomain: "docs-clone-e505e.firebaseapp.com",
  projectId: "docs-clone-e505e",
  storageBucket: "docs-clone-e505e.appspot.com",
  messagingSenderId: "768250424602",
  appId: "1:768250424602:web:43fc8d4b8cb92f695510a3",
};

// because this is nextJS, server may sometimes
// end up initializing the app, so we don't wanna
// initialize it twice.

const app = getApp.length === 0 ? initializeApp(firebaseConfig) : getApp()

// const db = FirestoreAdapter(firebaseConfig)
const db = getFirestore() 

export { db };