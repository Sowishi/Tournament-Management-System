import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useGetCarouselPic from "../hooks/useGetCarouselPic";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function TMSCarousel() {
  const { data } = useGetCarouselPic();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={1500}
        showDots={true}
        draggable={false} // Disable dragging
        className="h-full"
      >
        {data?.map((pic) => (
          <div
            key={pic.id}
            className="relative h-screen w-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${pic.url})`,
              filter: "brightness(60%)", // Darken the image
              backgroundSize: "contain",
              backgroundPositionY: 50,
            }}
          >
            {/* Overlay text with Framer Motion */}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
