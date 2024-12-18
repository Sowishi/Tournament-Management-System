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

const useCrudRace = () => {
  const getRaces = (setRaces) => {
    const colRef = collection(db, "races");
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setRaces(output);
    });
  };

  // Add a new tally record to the "tally" collection
  const addRace = async (data) => {
    try {
      const colRef = collection(db, "races");
      addDoc(colRef, data);
    } catch (error) {
      console.error("Error adding tally:", error);
    }
  };

  const deleteRace = async (id) => {
    try {
      const docRef = doc(db, "races", id);
      deleteDoc(docRef);
    } catch (error) {
      console.error("Error adding tally:", error);
    }
  };

  return { addRace, getRaces, deleteRace };
};

export default useCrudRace;