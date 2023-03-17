import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACfzoLmBuGf2zLJKo2-UAoKh0Q_HrMJ9Y",
  authDomain: "classiccomputer.firebaseapp.com",
  projectId: "classiccomputer",
  storageBucket: "classiccomputer.appspot.com",
  messagingSenderId: "380892354841",
  appId: "1:380892354841:web:1605d25dd748aeb83d4d88",
  measurementId: "G-SY7PKQYVFS",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage(app);
