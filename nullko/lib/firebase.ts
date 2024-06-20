// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNsQymgB5sl8J5_aG0WKP31BBQ2zjXgb8",
  authDomain: "nullqueue-60a5e.firebaseapp.com",
  databaseURL: "https://nullqueue-60a5e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nullqueue-60a5e",
  storageBucket: "nullqueue-60a5e.appspot.com",
  messagingSenderId: "100566126101",
  appId: "1:100566126101:web:bf907ba45036d88fbe481c",
  measurementId: "G-56KQBPG2M3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth, onAuthStateChanged };