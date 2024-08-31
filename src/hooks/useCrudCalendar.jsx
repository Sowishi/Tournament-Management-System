import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

const useCrudCalendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "calendar");

    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);

  const addCalendar = (forms) => {
    const colRef = collection(db, "calendar");
    addDoc(colRef, forms);
  };

  const deleteCalendar = (forms) => {
    const docRef = doc(db, "calendar", forms.id);
    deleteDoc(docRef);
  };
  return { addCalendar, data, deleteCalendar };
};

export default useCrudCalendar;
