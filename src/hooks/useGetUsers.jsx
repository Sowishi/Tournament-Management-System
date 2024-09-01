import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const useGetUsers = () => {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState();

  useEffect(() => {
    const colRef = collection(db, "users");

    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);

  const getSingleUser = (id) => {
    const docRef = doc(db, "users", id);
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setSingleData(snapshot.data());
      }
    });
  };
  return { data, getSingleUser, singleData };
};

export default useGetUsers;
