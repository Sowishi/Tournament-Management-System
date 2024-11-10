import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const useCrudTally = () => {
  const [data, setData] = useState([]);

  console.log(data);
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

  return { data, addTally };
};

export default useCrudTally;
