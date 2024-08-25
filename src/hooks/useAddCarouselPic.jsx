import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const useAddCarouselPic = () => {
  const addCarouselPic = (url) => {
    const colRef = collection(db, "carousel-pic");
    addDoc(colRef, { url, createdAt: serverTimestamp() });
  };

  return { addCarouselPic };
};

export default useAddCarouselPic;
