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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DefaultLayout removeMargin={true} hideWaves={true}>
          {/* Full-Screen Carousel */}
          <div className=" h-screen overflow-hidden">
            {/* Carousel Section */}
            <div className="">
              <TMSCarousel />
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default Landing;
