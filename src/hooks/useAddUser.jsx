import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const useAddUser = () => {
  const addUser = (forms) => {
    const colRef = collection(db, "users");
    addDoc(colRef, { ...forms, createdAt: serverTimestamp() });

    const notifRef = collection(db, "admin-notiications");
    const message = `A new user has registered. Representative Name: ${forms.schoolRepresentative}, College Name: ${forms.collegeName}`;
    addDoc(notifRef, {
      owner: ["Master Admin", "Event Admin"],
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  };

  return { addUser };
};

export default useAddUser;
