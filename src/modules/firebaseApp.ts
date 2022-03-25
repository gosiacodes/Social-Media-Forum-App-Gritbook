import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSQ4EwRXTEF6Rs_3REQTWtcOoBu3HOKEQ",
  authDomain: "gritbook-social-media-app.firebaseapp.com",
  databaseURL: "https://gritbook-social-media-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gritbook-social-media-app",
  storageBucket: "gritbook-social-media-app.appspot.com",
  messagingSenderId: "110931333305",
  appId: "1:110931333305:web:c540e52ab897acade50b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getDatabase(app); 

export { db };