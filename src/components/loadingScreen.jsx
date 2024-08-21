import { Spinner } from "flowbite-react";
import logo from "../assets/logo2.png";
import { AnimatePresence, motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
      }}
      className=" mx-auto w-full h-screen flex justify-center items-center"
    >
      <div className="wrapper flex justify-end items-center flex-col">
        <motion.img
          initial={{ y: -500, scale: 1 }}
          animate={{ y: 0, scale: 0.9 }}
          style={{ width: "200px" }}
          src={logo}
        />

        <div className="wrapper flex">
          <h1 className="text-white font-bold text-2xl mr-3">Loading</h1>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
