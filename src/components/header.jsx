import { Button, Dropdown } from "flowbite-react";
import logo from "../assets/logo2.png";
import Navigation from "./navigation";
import { Link } from "react-router-dom";
import { useStore } from "../zustand/store";
import { eventsName } from "../constant";
import { HiLogin, HiUser } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { motion } from "framer-motion";

const Header = () => {
  const { currentEvent, currentUser } = useStore();

  return (
    <>
      <div
        className="header w-100"
        style={{
          background:
            "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
        }}
      >
        <div className="brand flex items-center justify-between p-3 mx-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="wrapper flex items-center justify-start"
          >
            <img src={logo} alt="" style={{ width: "5rem", height: "5rem" }} />
            <div className="title ml-3">
              <h1
                className="text-xl text-white font-bold "
                style={{ letterSpacing: "3px" }}
              >
                {currentEvent
                  ? eventsName[currentEvent]
                  : " WEB-BASED: TOURNAMENT MANAGEMENT SYSTEM"}
              </h1>
              {!currentEvent && (
                <>
                  <div
                    className="line my-2 mx-2"
                    style={{ width: 500, height: 2, background: "#FFBD59" }}
                  ></div>
                  <p className="text-white text-sm mx-1">
                    You have to have a real love of your sport to carry you
                    through all the bad times
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {!currentUser && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="auth-links w-100 flex justify-end items-center mx-5"
            >
              <div className="flex mb-3">
                <motion.div whileHover={{ scale: 1.1 }} onTap={{ scale: 1 }}>
                  <a href={"/login"}>
                    <Button gradientMonochrome="info" className="mx-3">
                      <HiLogin className="mr-2 h-5 w-5" />
                      Login
                    </Button>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} onTap={{ scale: 1 }}>
                  <a href={"/registration"}>
                    <Button gradientMonochrome="teal" className="mx-3">
                      <HiOutlineUserAdd className="mr-2 h-5 w-5" />
                      Register
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentUser && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="auth-links w-100 flex justify-end items-center mx-5"
            >
              <div className="flex mb-3">
                <motion.div whileHover={{ scale: 1.1 }} onTap={{ scale: 1 }}>
                  <a href={"/login"}>
                    <Button gradientMonochrome="info" className="mx-3">
                      <HiUser className="mr-2 h-5 w-5" />
                      Account
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Navigation />
    </>
  );
};

export default Header;
