import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const useAddUser = () => {
  const addUser = (forms) => {
    const colRef = collection(db, "users");
    addDoc(colRef, { ...forms, createdAt: serverTimestamp() });
  };

  return { addUser };
};

export default useAddUser;
