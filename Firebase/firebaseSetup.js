import {apiKey} from "@env"

import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: "summer245520.firebaseapp.com",
  projectId: "summer245520",
  storageBucket: "summer245520.appspot.com",
  messagingSenderId: "313733660743",
  appId: "1:313733660743:web:ec46ffe0d12ff755a2f162"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);