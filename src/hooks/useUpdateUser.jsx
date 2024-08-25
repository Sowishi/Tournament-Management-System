import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const useUpdateUser = () => {
  const approveUser = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { status: "Approve" });
  };
  const rejectUser = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { status: "Reject" });
  };

  const deleteUser = (id) => {
    const docRef = doc(db, "users", id);
    deleteDoc(docRef);
  };

  return { approveUser, rejectUser, deleteUser };
};

export default useUpdateUser;
