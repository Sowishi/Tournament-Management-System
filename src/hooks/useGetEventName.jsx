import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const useGetEventName = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "event-name");

    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);

  const finalizeEvent = (event) => {
    const docRef = doc(db, "event-name", event.id);
    updateDoc(docRef, { status: "complete" });
  };

  return { data, finalizeEvent };
};

export default useGetEventName;
