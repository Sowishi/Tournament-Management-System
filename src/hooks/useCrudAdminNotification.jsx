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

const useAdminNotifiication = () => {
  const [data, setData] = useState([]);

  const colRef = collection(db, "admin-notiications");

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

  const markNotificationsAsRead = async (notifs) => {
    notifs.map((notif) => {
      updateDoc(doc(db, "admin-notiications", notif.id), { read: true });
    });
  };

  return { data, markNotificationsAsRead };
};

export default useAdminNotifiication;
