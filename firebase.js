// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJIjKLYg1ymKcLWiEEhqAoxYE8nAyoM9g",
  authDomain: "tournament-772d1.firebaseapp.com",
  projectId: "tournament-772d1",
  storageBucket: "tournament-772d1.appspot.com",
  messagingSenderId: "179981673732",
  appId: "1:179981673732:web:e82419abcb7562208d9c51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, storage };
