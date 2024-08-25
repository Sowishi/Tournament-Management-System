import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const useAddEventName = () => {
  const addEventName = (eventName) => {
    const colRef = collection(db, "event-name");
    addDoc(colRef, { eventName, createdAt: serverTimestamp() });
  };

  return { addEventName };
};

export default useAddEventName;
