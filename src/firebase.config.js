// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl8V0p01mdtD1fz_DSI37kPxJ9VEPU0Ds",
  authDomain: "venue-finder-92dd4.firebaseapp.com",
  projectId: "venue-finder-92dd4",
  storageBucket: "venue-finder-92dd4.appspot.com",
  messagingSenderId: "761730886719",
  appId: "1:761730886719:web:5b8e5126c6af0310c35c8a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
