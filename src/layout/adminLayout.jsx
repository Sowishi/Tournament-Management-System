import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiMenu,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../zustand/store";

export default function AdminLayout({ children }) {
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
                        <Sidebar.Item>View Site</Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item>Admin Home Page</Sidebar.Item>
                      </Link>
                      <Link to="/admin/users">
                        <Sidebar.Item>Users Management</Sidebar.Item>
                      </Link>
                      <Link to="/admin/admins">
                        <Sidebar.Item>Admins Management</Sidebar.Item>
                      </Link>{" "}
                      <Link to="/admin/calendar">
                        <Sidebar.Item>Calendar</Sidebar.Item>
                      </Link>
                      <Link to="/admin/tournament">
                        <Sidebar.Item>Tournament</Sidebar.Item>
                      </Link>
                      <Link
                        onClick={() => {
                          setCurrentAdmin(null);
                          localStorage.removeItem("admin");
                        }}
                      >
                        <Sidebar.Item>Logout</Sidebar.Item>
                      </Link>
                    </Sidebar.ItemGroup>
                  )}
                  {isEventAdmin && (
                    <Sidebar.ItemGroup>
                      {" "}
                      <a href="/home" target="_blank">
                        <Sidebar.Item>View Site</Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item>Admin Home Page</Sidebar.Item>
                      </Link>
                      <Link to="/admin/users">
                        <Sidebar.Item>Users Management</Sidebar.Item>
                      </Link>
                      <Link to="/admin/admins">
                        <Sidebar.Item>Calendar</Sidebar.Item>
                      </Link>
                      <Link to="/admin/admins">
                        <Sidebar.Item>Tournament</Sidebar.Item>
                      </Link>
                      <Link
                        onClick={() => {
                          setCurrentAdmin(null);
                          localStorage.removeItem("admin");
                        }}
                      >
                        <Sidebar.Item>Logout</Sidebar.Item>
                      </Link>
                    </Sidebar.ItemGroup>
                  )}
                  {isDocumentAdmin && (
                    <Sidebar.ItemGroup>
                      <a href="/home" target="_blank">
                        <Sidebar.Item>View Site</Sidebar.Item>
                      </a>
                      <Link to="/admin/home">
                        <Sidebar.Item>Admin Home Page</Sidebar.Item>
                      </Link>
                      <Link to="/admin/users">
                        <Sidebar.Item>Users Management</Sidebar.Item>
                      </Link>
                      <Link to="/admin/admins">
                        <Sidebar.Item>Documents</Sidebar.Item>
                      </Link>
                      <Link
                        onClick={() => {
                          setCurrentAdmin(null);
                          localStorage.removeItem("admin");
                        }}
                      >
                        <Sidebar.Item>Logout</Sidebar.Item>
                      </Link>
                    </Sidebar.ItemGroup>
                  )}
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <div className="w-full bg-slate-950 min-h-screen pb-20">
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
          <div className="wrapper mx-10">
            <h1 className="text-white text-2xl">Admin Dashboard</h1>
            <p className="text-blue-500">
              Logged in as: {getAdminRole(currentAdmin?.role)}
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
