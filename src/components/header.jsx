import { Button, Dropdown } from "flowbite-react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div
      className="header w-100"
      style={{
        background:
          "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
      }}
    >
      <div className="brand flex items-center justify-start p-2 mx-2">
        <img src={logo} alt="" />
        <div className="title">
          <h1 className="text-3xl text-white font-bold">
            WEB-BASED: TOURNAMENT MANAGEMENT SYSTEM
          </h1>
          <div
            className="line my-2 mx-2"
            style={{ width: 500, height: 2, background: "#FFBD59" }}
          ></div>
          <p className="text-white text-lg mx-1">
            You have to have a real love of your sport to carry you through all
            the bad times
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
      <div className="navs w-100 bg-white">
        <Button.Group className="mx-3">
          <Button color="gray">Home</Button>
          <Dropdown color={"gray"} label="Events">
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Button color="gray">Calendar</Button>
          <Button color="gray">Participant</Button>
        </Button.Group>
      </div>
    </div>
  );
};

export default Header;
