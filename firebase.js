// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL2cM4K7G1rPqJ3VL61hTE6ZnOaVsW4S8",
  authDomain: "tournamentv2-2ab3a.firebaseapp.com",
  projectId: "tournamentv2-2ab3a",
  storageBucket: "tournamentv2-2ab3a.firebasestorage.app",
  messagingSenderId: "419248394140",
  appId: "1:419248394140:web:24649e384bf0425c3a0259",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, storage };
