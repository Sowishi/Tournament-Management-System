import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudCollegeName = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "college-name");
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);

  const addCollegeName = (collegeName) => {
    const colRef = collection(db, "college-name");
    addDoc(colRef, { collegeName, createdAt: serverTimestamp() });
  };

  const deleteCollegeName = (id) => {
    const docRef = doc(db, "college-name", id);
    deleteDoc(docRef);
  };

  return { addCollegeName, data, deleteCollegeName };
};

export default useCrudCollegeName;
