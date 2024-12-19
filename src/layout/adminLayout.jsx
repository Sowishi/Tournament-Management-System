import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  Sidebar,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiSearch,
  HiOutlineChartSquareBar,
  HiMenu,
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiDesktopComputer,
  HiUsers,
  HiOutlineBell,
  HiOutlineRss,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../zustand/store";
import { HiOutlineReply, HiOutlineUser } from "react-icons/hi";
import { TbTournament } from "react-icons/tb";
import logo from "../assets/logo2.png";
import useGetEventName from "../hooks/useGetEventName";
import { MdLogout } from "react-icons/md";
import useAdminNotifiication from "../hooks/useCrudAdminNotification";
import moment from "moment/moment";

export default function AdminLayout({ children, client }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetEventName();
  const handleClose = () => setIsOpen(false);
  const {
    currentAdmin,
    setCurrentUser,
    setCurrentAdmin,
    setCurrentEvent,
    currentEvent,
  } = useStore();

  const isMasterAdmin = currentAdmin?.role == "Master Admin";
  const isEventAdmin = currentAdmin?.role == "Event Admin";
  const isDocumentAdmin = currentAdmin?.role == "Document Admin";
  const isTournamentManager = currentAdmin?.role == "Tournament Manager";
  const navigation = useNavigate();

  const getAdminRole = (role) => {
    if (role == "Master Admin") {
      return "Master Admin";
    }
    if (role == "Event Admin") {
      return "Event Admin";
    }

    if (role == "Document Admin") {
      return "Document Admin";
    }
    if (role == "Tournament Manager") {
      return "Tournament Manager";
    }
  };

  const getHeaderBackground = (role) => {
    if (role == "Master Admin") {
      return "bg-slate-800";
    }
    if (role == "Event Admin") {
      return "bg-green-800";
    }

    if (role == "Document Admin") {
      return "bg-red-800";
    }
  };

  useEffect(() => {
    if (data && !client) {
      const event = data.find(
        (event) => event.eventName == currentAdmin?.sportsEvent
      );

      setCurrentEvent(event);
    }
  }, [data]);

  const handleBellClick = () => {
    markNotificationsAsRead(filterNotif);
  };

  const { data: notifications, markNotificationsAsRead } =
    useAdminNotifiication();

  const filterNotif = notifications.filter((item) => {
    if (item.owner.includes(currentAdmin?.role)) {
      return item;
    }
  });

  const unreadNotif = filterNotif.filter((item) => {
    if (!item.read) {
      return item;
    }
  });
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  {isMasterAdmin && (
                    <Sidebar.ItemGroup>
                      <a href="/home" target="_blank">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            View Site <HiOutlineReply className="ml-2" />
                          </div>
                        </Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Admin Dashboard
                            <HiOutlineChartSquareBar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link to="/admin/users">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Users Management <HiOutlineUser className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link to="/admin/admins">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Admins Management{" "}
                            <HiOutlineUserCircle className="ml-3" />
                          </div>{" "}
                        </Sidebar.Item>
                      </Link>{" "}
                      <Link to="/admin/overwrite">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            System Overwrite{" "}
                            <HiOutlineUserCircle className="ml-3" />
                          </div>{" "}
                        </Sidebar.Item>
                      </Link>{" "}
                      {/* <Link to="/admin/calendar">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Calendar <HiOutlineCalendar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link> */}
                      <Link to="/admin/system-log">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            System Logs
                            <HiDesktopComputer className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Sidebar.Item
                        onClick={() => setIsOpen(false)}
                        className="mt-20"
                      >
                        <img src={logo} />
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  )}
                  {isEventAdmin && (
                    <Sidebar.ItemGroup>
                      <a href="/home" target="_blank">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            View Site <HiOutlineReply className="ml-2" />
                          </div>
                        </Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Admin Dashboard
                            <HiOutlineChartSquareBar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      {!currentEvent?.status && (
                        <>
                          <Link to="/admin/users">
                            <Sidebar.Item
                              onClick={() => setIsOpen(false)}
                              className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                            >
                              <div className="flex items-center">
                                Users Management <HiUsers className="ml-3" />
                              </div>
                            </Sidebar.Item>
                          </Link>
                          <Link to="/admin/tournament-manager">
                            <Sidebar.Item
                              onClick={() => setIsOpen(false)}
                              className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                            >
                              <div className="flex items-center">
                                Tournament Managers
                                <HiUsers className="ml-3" />
                              </div>
                            </Sidebar.Item>
                          </Link>
                        </>
                      )}
                      <Link to="/admin/select-tournament">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Tournament
                            <TbTournament className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link to="/admin/reports">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Generate Reports
                            <HiOutlineUserCircle className="ml-3" />
                          </div>{" "}
                        </Sidebar.Item>
                      </Link>{" "}
                      <Sidebar.Item
                        onClick={() => setIsOpen(false)}
                        className="mt-20"
                      >
                        <img src={logo} />
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  )}
                  {isDocumentAdmin && (
                    <Sidebar.ItemGroup>
                      <a href="/home" target="_blank">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            View Site <HiOutlineReply className="ml-2" />
                          </div>
                        </Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Admin Dashboard
                            <HiOutlineChartSquareBar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link to="/admin/users">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Users Management <HiOutlineUser className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>

                      <Sidebar.Item
                        onClick={() => setIsOpen(false)}
                        className="mt-20"
                      >
                        <img src={logo} />
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  )}
                  {isTournamentManager && (
                    <Sidebar.ItemGroup>
                      <a href="/home" target="_blank">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            View Site <HiOutlineReply className="ml-2" />
                          </div>
                        </Sidebar.Item>
                      </a>
                      {/* <Link to="/admin/tournament">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Tournament
                            <HiOutlineChartSquareBar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link> */}

                      <Sidebar.Item
                        onClick={() => setIsOpen(false)}
                        className="mt-20"
                      >
                        <img src={logo} />
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  )}
                  <Sidebar.ItemGroup>
                    <Button
                      className="w-full"
                      color={"failure"}
                      onClick={async () => {
                        setCurrentUser(null);
                        setCurrentAdmin(null);
                        localStorage.removeItem("user");
                        window.location.reload();

                        navigation("/");
                      }}
                    >
                      Logout
                    </Button>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <div
        className={`w-full ${
          client ? "background-[#FC7F72]" : "bg-slate-950"
        } min-h-screen `}
      >
        {!client && (
          <div
            className={`header ${getHeaderBackground(
              currentAdmin?.role
            )} py-5 flex justify-between items-center px-10`}
          >
            <HiMenu
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
              color="white"
              size={25}
            />
            <div className="wrapper mx-10 flex items-center justify-start">
              <div className="flex flex-col">
                <h1 className="text-white textt-sm md:text-2xl">
                  {currentAdmin?.role !== "Master Admin" && (
                    <>
                      {currentAdmin?.fullName} |{" "}
                      {currentAdmin?.sportsEvent
                        ? currentAdmin?.sportsEvent
                        : currentAdmin?.assignEvent}
                    </>
                  )}
                </h1>
                <p className="text-blue-500 text-lg">
                  Logged in as: {getAdminRole(currentAdmin?.role)}
                </p>
              </div>
              {currentAdmin && (
                <>
                  {/* Notification Icon */}
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <div className="relative" onClick={handleBellClick}>
                        <HiOutlineBell
                          className="ml-5"
                          color="white"
                          size={30}
                        />
                        {filterNotif.length > 0 && (
                          <>
                            {unreadNotif.length >= 1 && (
                              <Badge
                                color="failure"
                                className="absolute -top-1 -right-2 rounded-full"
                              >
                                {unreadNotif.length}
                              </Badge>
                            )}
                          </>
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
                </>
              )}
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
