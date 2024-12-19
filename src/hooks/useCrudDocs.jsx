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
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const useCrudDocs = () => {
  const handleCreateFolder = async (folderName, owner) => {
    const colRef = collection(db, "folders");

    // Query to check if a folder with the same name exists for the current user
    const q = query(
      colRef,
      where("folderName", "==", folderName),
      where("owner", "==", owner)
    );
    const querySnapshot = await getDocs(q);

    // If a folder with the same name exists for this user, do not proceed
    if (!querySnapshot.empty) {
      toast.error("You already have a folder with this name.");
      return;
    }

    // Proceed to create the folder if no duplicate is found for this user
    await addDoc(colRef, {
      folderName,
      owner,
      createdAt: serverTimestamp(),
    });

    toast.success("Folder created successfully.");
  };

  const getUserFolders = (currentUser, setFolders) => {
    console.log(currentUser, setFolders);
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

  const handleCreateFile = async (
    file,
    fileLabel,
    ownerId,
    folderId,
    userFullName
  ) => {
    try {
      // Reference to the specific folder's files sub-collection
      const folderRef = doc(db, "folders", folderId);
      const filesCollectionRef = collection(folderRef, "files");

      // Add a new file document to the files sub-collection
      await addDoc(filesCollectionRef, {
        fileUrl: file,
        fileLabel,
        ownerId,
        createdAt: serverTimestamp(),
      });

      toast.success("File created successfully.");

      const notifRef = collection(db, "admin-notiications");
      const message = `A user: ${userFullName} uploaded a document for ${fileLabel}`;
      addDoc(notifRef, {
        owner: ["Document Admin"],
        message,
        read: false,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating file: ", error);
      toast.error("Failed to create file.");
    }
  };

  const getFilesInFolder = (folderId, setCurrentFiles) => {
    try {
      // Reference to the files sub-collection within the specified folder
      const folderRef = doc(db, "folders", folderId);
      const filesCollectionRef = collection(folderRef, "files");

      // Real-time listener for the files sub-collection
      const unsubscribe = onSnapshot(filesCollectionRef, (querySnapshot) => {
        const files = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCurrentFiles(files);
      });

      // Return the unsubscribe function to stop listening when needed
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up real-time listener for files: ", error);
      setCurrentFiles([]);
    }
  };

  const deleteFile = async (folderId, fileId) => {
    try {
      // Reference to the specific file document within the folder's files sub-collection
      const fileRef = doc(db, "folders", folderId, "files", fileId);

      // Delete the file document
      await deleteDoc(fileRef);

      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  const updateFileStatus = async (folderId, fileId, newStatus) => {
    try {
      // Reference to the specific file document within the folder's files sub-collection
      const fileRef = doc(db, "folders", folderId, "files", fileId);

      // Update the status field of the file document
      await updateDoc(fileRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      toast.success("File status updated successfully.");
    } catch (error) {
      console.error("Error updating file status: ", error);
      toast.error("Failed to update file status.");
    }
  };

  return {
    handleCreateFolder,
    getUserFolders,
    handleDeleteFolder,
    handleCreateFile,
    getFilesInFolder,
    deleteFile,
    updateFileStatus,
  };
};

export default useCrudDocs;
