import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const useCrudAdmin = () => {
  const [data, setData] = useState([]);

  const colRef = collection(db, "admins");

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
    addDoc(colRef, forms);
  };

  return { data, addAdmin };
};

export default useCrudAdmin;
