// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_1RK9PRSawKk6J83Kkn7fQiciZtlvLnE",
  authDomain: "hatchery-iot.firebaseapp.com",
  databaseURL: "https://hatchery-iot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hatchery-iot",
  storageBucket: "hatchery-iot.firebasestorage.app",
  messagingSenderId: "596174046132",
  appId: "1:596174046132:web:6b8fa383e85d0d5e4828e1",
  measurementId: "G-QD20F3TZCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
// const analytics = getAnalytics(app);