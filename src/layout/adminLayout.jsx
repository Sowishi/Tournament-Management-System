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
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
                  <Sidebar.ItemGroup>
                    <Link to="/admin/home">
                      <Sidebar.Item>Admin Home Page</Sidebar.Item>
                    </Link>

                    <Link to="/admin/users">
                      <Sidebar.Item>Users Management</Sidebar.Item>
                    </Link>
                    <Link to="/admin/admins">
                      <Sidebar.Item>Admins Management</Sidebar.Item>
                    </Link>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <div className="w-full bg-slate-950 min-h-screen">
        <div className="header bg-slate-800 py-3 flex justify-between items-center px-10">
          <HiMenu
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            color="white"
            size={25}
          />
          <div className="wrapper mx-10">
            <h1 className="text-white text-2xl">Admin Dashboard</h1>
            <p className="text-blue-500">Logged in as: Super Admin</p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
