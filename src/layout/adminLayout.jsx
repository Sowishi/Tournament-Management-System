import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiSearch,
  HiOutlineChartSquareBar,
  HiMenu,
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiDesktopComputer,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../zustand/store";
import { HiOutlineReply, HiOutlineUser } from "react-icons/hi";
import { TbTournament } from "react-icons/tb";
import logo from "../assets/logo2.png";

export default function AdminLayout({ children, client }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const { currentAdmin, setCurrentUser, setCurrentAdmin } = useStore();

  const isMasterAdmin = currentAdmin?.role == "Master Admin";
  const isEventAdmin = currentAdmin?.role == "Event Admin";
  const isDocumentAdmin = currentAdmin?.role == "Document Admin";
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
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
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
                      <Link to="/admin/calendar">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Calendar <HiOutlineCalendar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link>
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

                      <Link to="/admin/calendar">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Calendar <HiOutlineCalendar className="ml-3" />
                          </div>
                        </Sidebar.Item>
                      </Link>
                      <Link to="/admin/tournament">
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

                      <Link to="/admin/calendar">
                        <Sidebar.Item
                          onClick={() => setIsOpen(false)}
                          className="bg-blue-950 text-white hover:text-white hover:bg-red-500 my-3"
                        >
                          <div className="flex items-center">
                            Calendar <HiOutlineCalendar className="ml-3" />
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
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <div
        className={`w-full ${
          client ? "background-[#FC7F72]" : "bg-slate-950"
        } min-h-screen pb-20`}
      >
        {!client && (
          <div
            className={`header ${getHeaderBackground(
              currentAdmin?.role
            )} py-3 flex justify-between items-center px-10`}
          >
            <HiMenu
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
              color="white"
              size={25}
            />
            <div className="wrapper mx-10 flex items-center justify-start">
              <div className="flex flex-col">
                <h1 className="text-white text-2xl">Admin Dashboard</h1>
                <p className="text-blue-500">
                  Logged in as: {getAdminRole(currentAdmin?.role)}
                </p>
              </div>

              <Button
                onClick={() => {
                  setCurrentAdmin(null);
                  localStorage.removeItem("user");
                }}
                color={"failure"}
                className="ml-5"
              >
                Logout
              </Button>
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
