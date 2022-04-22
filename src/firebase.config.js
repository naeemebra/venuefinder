// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR8fdy8dZ_9x2RESQu1vFlHXZWYWMgpE4",
  authDomain: "house-marketplace-3a148.firebaseapp.com",
  projectId: "house-marketplace-3a148",
  storageBucket: "house-marketplace-3a148.appspot.com",
  messagingSenderId: "504054783108",
  appId: "1:504054783108:web:ffc7cc5be86aa44d58f6d1",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
