import { Carousel } from "flowbite-react";
import img1 from "../assets/image 3.png";
import img2 from "../assets/image 4.png";
import img3 from "../assets/image 5.png";
import img4 from "../assets/image 6.png";

export function TMSCarousel() {
  return (
    <div className="w-100 h-96 mx-5 mt-2">
      <Carousel slide={false}>
        <img src={img1} alt="..." />
        <img src={img2} alt="..." />
        <img src={img3} alt="..." />
        <img src={img4} alt="..." />
      </Carousel>
    </div>
  );
}
