import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const useCrudTally = () => {
  const [data, setData] = useState([]);

  // Fetch data on component mount and set up a real-time listener
  useEffect(() => {
    const colRef = collection(db, "tally");
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(output);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Add a new tally record to the "tally" collection
  const addTally = async (newData) => {
    try {
      const colRef = collection(db, "tally");
      await addDoc(colRef, { ...newData, timestamp: serverTimestamp() });
    } catch (error) {
      console.error("Error adding tally:", error);
    }
  };

  // Delete a tally record by ID
  const deleteTally = async (id) => {
    try {
      const docRef = doc(db, "tally", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting tally:", error);
    }
  };

  // Update a tally record by ID
  const updateTally = async (id, newData) => {
    try {
      const docRef = doc(db, "tally", id);
      await updateDoc(docRef, { ...newData, timestamp: serverTimestamp() });
    } catch (error) {
      console.error("Error updating tally:", error);
    }
  };

  return { data, addTally, deleteTally, updateTally };
};

export default useCrudTally;
