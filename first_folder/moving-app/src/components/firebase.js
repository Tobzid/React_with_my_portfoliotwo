// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_gXIQMrYBG9DXGgwwyPS3oG0h7ZVf4X4",
  authDomain: "moving-services-chat.firebaseapp.com",
  databaseURL: "https://moving-services-chat-default-rtdb.firebaseio.com",
  projectId: "moving-services-chat",
  storageBucket: "moving-services-chat.firebasestorage.app",
  messagingSenderId: "594438738236",
  appId: "1:594438738236:web:fa1dd4de1a422c5b8f0e39",
  measurementId: "G-WSWYDB9CJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);