import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudNotifications = () => {
  const [data, setData] = useState([]);

  const colRef = collection(db, "notifications");

  const q = query(colRef, orderBy("createdAt"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output.reverse());
    });
  }, []);

  return { data };
};

export default useCrudNotifications;
