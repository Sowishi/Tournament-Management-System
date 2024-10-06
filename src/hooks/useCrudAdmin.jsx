import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudAdmin = () => {
  const [data, setData] = useState([]);

  const colRef = collection(db, "users");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);
  const addAdmin = (forms) => {
    addDoc(colRef, { ...forms, userType: "admin" });
  };
  const updateAdmin = (forms) => {
    updateDoc(doc(db, "users", forms.id), forms);
  };
  const deleteAdmin = (forms) => {
    deleteDoc(doc(db, "users", forms.id));
  };

  return { data, addAdmin, updateAdmin, deleteAdmin };
};

export default useCrudAdmin;
