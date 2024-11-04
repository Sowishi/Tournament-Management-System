import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TMSCarousel } from "../components/carousel";
import LoadingScreen from "../components/loadingScreen";
import DefaultLayout from "../layout/defaultLayout";
import { Button } from "flowbite-react";
import { useStore } from "../zustand/store";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const { setCurrentEvent, currentEvent, currentUser, setCurrentUser } =
    useStore();
  const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Animation variants
  const infoBoxVariants = {
    hidden: { opacity: 0, x: 30 }, // Adjust to slide in from the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DefaultLayout removeMargin={true} hideWaves={true}>
          {/* Full-Screen Carousel */}
          <div className="relative w-full h-screen flex items-start justify-start overflow-hidden">
            <TMSCarousel />
            <motion.div
              className="absolute bottom-40 right-10 transform -translate-y-1/2 bg-white bg-opacity-80 p-8 rounded-lg max-w-md shadow-lg backdrop-blur-lg"
              variants={infoBoxVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="font-bold text-4xl text-gray-800 mb-4">
                Tournament Management System
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus asperiores, ducimus porro hic dolore quas vel vitae
                incidunt aspernatur natus laudantium accusamus necessitatibus
                dicta. Incidunt at nihil vel aspernatur quia!
              </p>
              <Button
                onClick={() => navigation("/about")}
                className="w-full py-3"
                gradientDuoTone="cyanToBlue"
              >
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default Landing;
