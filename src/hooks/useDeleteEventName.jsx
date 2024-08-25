import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const useDeleteEventName = () => {
  const deleteEventName = (id) => {
    const docRef = doc(db, "event-name", id);
    deleteDoc(docRef);
  };

  return { deleteEventName };
};

export default useDeleteEventName;
