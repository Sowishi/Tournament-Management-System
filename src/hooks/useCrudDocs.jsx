import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const useCrudDocs = () => {
  const handleCreateFolder = async (folderName, owner) => {
    const colRef = collection(db, "folders");

    // Query to check if a folder with the same name already exists
    const q = query(colRef, where("folderName", "==", folderName));
    const querySnapshot = await getDocs(q);

    // If a folder with the same name exists, do not proceed
    if (!querySnapshot.empty) {
      toast.error("Folder with this name already exists.");
      return;
    }

    // Proceed to create the folder if no duplicate is found
    await addDoc(colRef, {
      folderName,
      owner,
      createdAt: serverTimestamp(),
    });

    toast.success("Folder created successfully.");
  };

  const getUserFolders = (currentUser, setFolders) => {
    const colRef = collection(db, "folders");

    // Query to get all folders where the owner is the current user
    const q = query(colRef, where("owner", "==", currentUser.id));

    // Listen to real-time changes using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userFolders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update state with the fetched folders
      setFolders(userFolders);
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      const folderRef = doc(db, "folders", folderId);
      await deleteDoc(folderRef);
      console.log("Folder deleted successfully");
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return { handleCreateFolder, getUserFolders, handleDeleteFolder };
};

export default useCrudDocs;
