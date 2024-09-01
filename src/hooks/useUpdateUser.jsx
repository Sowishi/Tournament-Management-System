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

  const updateUser = (forms) => {
    const docRef = doc(db, "users", forms.id);
    updateDoc(docRef, forms);
  };

  return { approveUser, rejectUser, deleteUser, updateUser };
};

export default useUpdateUser;
