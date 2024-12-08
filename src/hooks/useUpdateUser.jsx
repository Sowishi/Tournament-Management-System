import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useUpdateUser = () => {
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
    const notifRef = collection(db, "notifications");
    addDoc(notifRef, {
      message: "Your SUC account is approved!",
      ownerID: id,
      createdAt: serverTimestamp(),
      read: false,
    });
    updateDoc(docRef, { status: "Approve" });
  };
  const rejectUser = (id) => {
    const docRef = doc(db, "users", id);
    const notifRef = collection(db, "notifications");
    addDoc(notifRef, {
      message: "Your SUC account is rejected.",
      ownerID: id,
      createdAt: serverTimestamp(),
    });
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

  const deleteDocument = (id) => {
    const docRef = doc(db, "documents", id);
    deleteDoc(docRef);
  };

  const uploadLogo = (forms, logoFile) => {
    const docRef = doc(db, "users", forms.id);
    const updated = { ...forms, collegeLogoURL: logoFile };
    updateDoc(docRef, updated);
  };

  const addPlayersCoaches = (user, id) => {
    const colRef = collection(db, "users", id, "playersCoaches");
    addDoc(colRef, { ...user, createdAt: serverTimestamp() });
  };
  const getPlayerCoaches = (id, setPlayerCoaches) => {
    if (id) {
      const colRef = collection(db, "users", id, "playersCoaches");
      onSnapshot(colRef, (snapshot) => {
        const output = [];
        snapshot.docs.forEach((doc) => {
          output.push({ ...doc.data(), id: doc.id });
        });
        setPlayerCoaches(output);
      });
    }
  };
  const deletePlayerCoach = (userID, pcID) => {
    const colRef = doc(db, "users", userID, "playersCoaches", pcID);
    deleteDoc(colRef);
  };

  return {
    approveUser,
    rejectUser,
    deleteUser,
    updateUser,
    addDocument,
    deleteDocument,
    uploadLogo,
    addPlayersCoaches,
    getPlayerCoaches,
    deletePlayerCoach,
    documents,
  };
};

export default useUpdateUser;
