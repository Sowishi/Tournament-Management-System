import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useGetCarouselPic from "../hooks/useGetCarouselPic";

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
        autoPlaySpeed={3000}
        showDots={true}
        draggable={false} // Disable dragging
        className="h-full"
      >
        {data?.map((pic) => (
          <div
            key={pic.id}
            className="relative h-screen w-screen bg-cover bg-center" // Set as background
            style={{
              backgroundImage: `url(${pic.url})`,
              filter: "brightness(60%)", // Darken the image
            }}
          >
            {/* Overlay text (optional) */}
            <div className="absolute inset-0 flex items-center justify-center text-white px-4 md:px-10 lg:px-20">
              <div className="bg-black bg-opacity-40 p-4 md:p-8 rounded-lg">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Tournament Management System
                </h2>
                <p className="mt-2 text-md md:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
