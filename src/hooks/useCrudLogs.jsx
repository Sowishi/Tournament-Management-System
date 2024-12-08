import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const useCrudLogs = () => {
  const [data, setData] = useState([]);

  // Fetch data on component mount and set up a real-time listener
  useEffect(() => {
    const colRef = collection(db, "logs");
    const q = query(colRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(output.reverse());
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Add a new tally record to the "tally" collection
  const addLog = async (user, label) => {
    try {
      const colRef = collection(db, "logs");
      addDoc(colRef, {
        user,
        label,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { data, addLog };
};

export default useCrudLogs;
