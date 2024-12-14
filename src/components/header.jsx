import { Avatar, Badge, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo2.png";
import { useEffect, useState } from "react";
import useGetEventName from "../hooks/useGetEventName";
import { useStore } from "../zustand/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiLogin,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineRss,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiViewBoards,
} from "react-icons/hi";
import useCrudNotifications from "../hooks/useCrudNotifications";
import moment from "moment/moment";

export default function Header({ removeMargin }) {
  const { setCurrentEvent, currentEvent, currentUser, setCurrentUser } =
    useStore();
  const { data: eventNameData } = useGetEventName();

  const { data: notifications, markNotificationsAsRead } =
    useCrudNotifications();

  useEffect(() => {
    setCurrentEvent(currentUser?.sportsEvent);
  }, []);

  const navigation = useNavigate();

  const { pathname } = useLocation();

  const filterNotif = notifications.filter((item) => {
    if (item.ownerID == currentUser?.id) {
      return item;
    }
  });

  const unreadNotif = notifications.filter((item) => {
    if (item.ownerID == currentUser?.id && !item.read) {
      return item;
    }
  });

  const handleBellClick = () => {
    markNotificationsAsRead(filterNotif);
  };

  return (
    <>
      <Navbar
        fluid
        rounded
        className="fixed top-0 left-0 w-full h-16 shadow-lg z-10 bg-white mb-16"
      >
        <Navbar.Brand className="ml-5">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white flex items-center justify-start">
            <div className="hidden md:flex">
              <>Sports Event: </>
            </div>
            <Badge size={"md"} color={"warning"} className="ml-5 px-5 py-2">
              {currentEvent ? currentEvent : "No Event Selected"}
            </Badge>
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 mr-5 items-center space-x-4">
          <h1 className="font-bold">{currentUser?.username}</h1>
          {currentUser && (
            <>
              {/* Notification Icon */}
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="relative" onClick={handleBellClick}>
                    <HiOutlineBell size={30} />
                    {filterNotif.length > 0 && (
                      <Badge
                        color="failure"
                        className="absolute -top-1 -right-2 rounded-full"
                      >
                        {unreadNotif.length}
                      </Badge>
                    )}
                  </div>
                }
              >
                {filterNotif.length > 0 ? (
                  filterNotif.map((notification) => (
                    <Dropdown.Item
                      onClick={() => {
                        if (
                          notification.message
                            .toLowerCase()
                            .includes("scheduled")
                        ) {
                          navigation("/events");
                        }
                        if (
                          notification.message.toLowerCase().includes("suc")
                        ) {
                          navigation("/user");
                        }
                      }}
                      key={notification.id}
                      className="flex items-center gap-3 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                    >
                      {/* Icon */}
                      <HiOutlineRss className="h-6 w-6 text-blue-500 flex-shrink-0" />

                      {/* Message and Date */}
                      <div className="flex flex-col items-start justify-start">
                        <span
                          className={`text-sm ${
                            notification.unread
                              ? "font-bold text-black"
                              : "font-normal text-gray-700"
                          }`}
                        >
                          {notification.message}
                        </span>
                        {/* Date and Time */}
                        <h1>
                          {moment(notification.createdAt.toDate()).format(
                            "LLL"
                          )}
                        </h1>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item className="text-center text-gray-500">
                    No notifications
                  </Dropdown.Item>
                )}
                <Dropdown.Divider />
                {/* <Dropdown.Item>
                  <Button
                    onClick={() => navigation("/notifications")}
                    color="info"
                    size="sm"
                    className="w-full"
                  >
                    See All Notifications
                  </Button>
                </Dropdown.Item> */}
              </Dropdown>

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
                  Profile
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
            </>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="bg-white mt-10 md:mt-0 px-5">
          <Button.Group className="flex flex-col md:flex-row">
            <Link className="my-3 md:my-0" to="/home">
              <Button color={pathname == "/home" ? "info" : "gray"}>
                <HiOutlineHome className="mr-2 h-5 w-5" />
                Home
              </Button>
            </Link>

            {!currentEvent && (
              <Link className="my-3 md:my-0" to={"/about"}>
                <Button color={pathname == "/about" ? "info" : "gray"}>
                  <HiOutlineMap className="mr-2 h-5 w-5" />
                  About Us
                </Button>
              </Link>
            )}

            {!currentUser && (
              <Link className="my-3 md:my-0" to={"/login"}>
                <Button color="gray">
                  <HiLogin className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </Link>
            )}
            {currentEvent && (
              <>
                <Link className="my-3 md:my-0" to={"/events"}>
                  <Button
                    disabled={currentUser.status == undefined}
                    color={pathname == "/events" ? "info" : "gray"}
                  >
                    <HiOutlineRss className="mr-2 h-5 w-5" />
                    Events
                  </Button>
                </Link>
                <Link className="my-3 md:my-0" to={"/participants"}>
                  <Button
                    disabled={currentUser.status == undefined}
                    color={pathname == "/participants" ? "info" : "gray"}
                  >
                    <HiOutlineUserGroup className="mr-2 h-5 w-5" />
                    Participants
                  </Button>
                </Link>
                <Link className="my-3 md:my-0" to={"/tally"}>
                  <Button
                    disabled={currentUser.status == undefined}
                    color={pathname == "/tally" ? "info" : "gray"}
                  >
                    <HiViewBoards className="mr-2 h-5 w-5" />
                    Tally
                  </Button>
                </Link>
              </>
            )}
          </Button.Group>
        </Navbar.Collapse>
      </Navbar>

      {/* Additional spacing below the header */}
      {!removeMargin && <div className="mt-20"></div>}
    </>
  );
}
