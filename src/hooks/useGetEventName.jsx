import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
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
  return { data };
};

export default useGetEventName;
