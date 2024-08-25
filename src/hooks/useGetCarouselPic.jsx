import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const useGetCarouselPic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "carousel-pic");

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

export default useGetCarouselPic;
