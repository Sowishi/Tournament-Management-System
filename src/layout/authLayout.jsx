import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import tmsBG from "../assets/reg.jpg";
import TmsInput from "../components/tmsInput";

const AuthLayout = ({ children, hideHeader }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tmsBG})`,
        minHeight: "100vh", // Adjust height and width as needed
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen bg-slate-300 flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default AuthLayout;
