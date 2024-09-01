import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useUpdateUser = (userID) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "documents");

    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(output);
    });
  }, []);
  const approveUser = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { status: "Approve" });
  };
  const rejectUser = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { status: "Reject" });
  };

  const deleteUser = (id) => {
    const docRef = doc(db, "users", id);
    deleteDoc(docRef);
  };

  const updateUser = (forms) => {
    const docRef = doc(db, "users", forms.id);
    updateDoc(docRef, forms);
  };

  const addDocument = (file, fileLabel, id) => {
    const colRef = collection(db, "documents");
    addDoc(colRef, { file, fileLabel, owner: id });
  };

  return {
    approveUser,
    rejectUser,
    deleteUser,
    updateUser,
    addDocument,
    documents,
  };
};

export default useUpdateUser;
