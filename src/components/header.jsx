import { Button, Dropdown } from "flowbite-react";
import logo from "../assets/logo.png";
import Navigation from "./navigation";

const Header = () => {
  return (
    <>
      <div
        className="header w-100"
        style={{
          background:
            "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
          height: "20vh",
        }}
      >
        <div className="brand flex items-center justify-between p-2 mx-2">
          <div className="wrapper flex items-center justify-start">
            <img src={logo} alt="" style={{ width: "6rem", height: "6rem" }} />
            <div className="title">
              <h1 className="text-xl text-white font-bold">
                WEB-BASED: TOURNAMENT MANAGEMENT SYSTEM
              </h1>
              <div
                className="line my-2 mx-2"
                style={{ width: 500, height: 2, background: "#FFBD59" }}
              ></div>
              <p className="text-white text-sm mx-1">
                You have to have a real love of your sport to carry you through
                all the bad times
              </p>
            </div>
          </div>

          <div className="auth-links w-100 flex justify-end items-center mx-5">
            <div className="flex mb-3">
              <Button color="success" className="mx-3">
                Log in
              </Button>
              <Button outline color="success" className="mx-3">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default Header;
