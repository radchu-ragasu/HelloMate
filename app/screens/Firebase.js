// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD13jcfaHptcvLPs-Pu9SpIVL1sJU335MU",
  authDomain: "hellomate-bf893.firebaseapp.com",// "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://hellomate-bf893-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "hellomate-bf893",
  storageBucket: "hellomate-bf893.firebasestorage.app",
  messagingSenderId: "265307671400",
  appId: "1:265307671400:android:94fa69f1d453a37794a4dd"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

