import { Carousel } from "flowbite-react";
import img1 from "../assets/image 3.png";
import img2 from "../assets/image 4.png";
import img3 from "../assets/image 5.png";
import img4 from "../assets/image 6.png";
import useGetCarouselPic from "../hooks/useGetCarouselPic";

export function TMSCarousel() {
  const { data } = useGetCarouselPic();

  return (
    <div className="h-full mx-3 mt-5 w-full">
      <Carousel>
        {data?.map((pic) => {
          return <img key={pic.id} src={pic.url} alt="..." />;
        })}
      </Carousel>
    </div>
  );
}
