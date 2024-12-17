import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const useCrudPoints = () => {
  const getPoints = (event, setPoints) => {
    const docRef = doc(db, "points", event); // Access the collection
    onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setPoints(docSnapshot.data());
        } else {
          console.log("Document does not exist");
        }
      },
      (error) => {
        console.error("Error listening to document:", error);
      }
    );
  };

  // Add a new tally record to the "tally" collection
  const addPoints = async (data, event) => {
    try {
      const docRef = doc(db, "points", event);
      setDoc(docRef, data);
    } catch (error) {
      console.error("Error adding tally:", error);
    }
  };

  return { addPoints, getPoints };
};

export default useCrudPoints;
