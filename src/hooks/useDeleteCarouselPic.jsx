import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const useDeleteCarouselPic = () => {
  const deleteCarouselPic = (id) => {
    const docRef = doc(db, "carousel-pic", id);
    deleteDoc(docRef);
  };

  return { deleteCarouselPic };
};

export default useDeleteCarouselPic;
