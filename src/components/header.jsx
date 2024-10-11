"use client";

import { Avatar, Badge, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo2.png";
import { useEffect } from "react";
import useGetEventName from "../hooks/useGetEventName";
import { useStore } from "../zustand/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiLogin,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineRss,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiViewBoards,
} from "react-icons/hi";

export default function Header() {
  const { setCurrentEvent, currentEvent, currentUser, setCurrentUser } =
    useStore();
  const { data: eventNameData } = useGetEventName();

  useEffect(() => {
    setCurrentEvent(currentUser?.sportsEvent);
  }, []);

  const navigation = useNavigate();

  const { pathname } = useLocation();



  return (
    <Navbar fluid rounded className="py-3 shadow-lg">
      <Navbar.Brand className="ml-5">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white flex items-center justify-start">
          Sports Event:{" "}
          <Badge size={"md"} color={"warning"} className="ml-5 px-5 py-2">
            {currentEvent ? currentEvent : "No Event Selected"}
          </Badge>
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mr-5">
        {currentUser && (
          <Dropdown
            arrowIcon={false}
            inline
            label={<HiOutlineUserCircle size={30} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item
              onClick={() => {
                navigation("/user");
              }}
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                setCurrentUser(null);
                navigation("/");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Button.Group>
          <Link to="/home">
            <Button color={pathname == "/home" ? "info" : "gray"}>
              {" "}
              <HiOutlineHome className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>

          {!currentEvent && (
            <>
              <Link to={"/about"}>
                <Button color={pathname == "/about" ? "info" : "gray"}>
                  {" "}
                  <HiOutlineMap className="mr-2 h-5 w-5" />
                  About Us
                </Button>
              </Link>
            </>
          )}

          {!currentUser && (
            <Link to={"/login"}>
              <Button color="gray">
                {" "}
                <HiLogin className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
          )}
          {currentEvent && (
            <>
              {/* <Link to={"/calendar"}>
                <Button color={pathname == "/calendar" ? "info" : "gray"}>
                  {" "}
                  <HiOutlineCalendar className="mr-2 h-5 w-5" />
                  Calendar
                </Button>
              </Link> */}
              <Link to={"/events"}>
                <Button disabled={currentUser.status == undefined} color={pathname == "/events" ? "info" : "gray"}>
                  {" "}
                  <HiOutlineRss className="mr-2 h-5 w-5" />
                  Events
                </Button>
              </Link>
              <Link to={"/participants"}>
                <Button disabled={currentUser.status == undefined}  color={pathname == "/participants" ? "info" : "gray"}>
                  {" "}
                  <HiOutlineUserGroup className="mr-2 h-5 w-5" />
                  Participants
                </Button>
              </Link>
              <Link to={"/tally"}>
                <Button disabled={currentUser.status == undefined}  color={pathname == "/tally" ? "info" : "gray"}>
                  {" "}
                  <HiViewBoards className="mr-2 h-5 w-5" />
                  Tally
                </Button>
              </Link>
            </>
          )}
        </Button.Group>
      </Navbar.Collapse>
    </Navbar>
  );
}
