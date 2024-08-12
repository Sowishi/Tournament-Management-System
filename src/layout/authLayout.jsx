import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import img19 from "../assets/image 19.png";
import TmsInput from "../components/tmsInput";

const AuthLayout = ({ children, hideHeader }) => {
  return (
    <div className="w-full min-h-screen bg-slate-300 flex justify-center items-center">
      <div className="basis-4/12">
        <img src={img19} alt="" />
      </div>
      <div className="basis-full flex justify-center items-center">
        <div className="wrapper">
          {!hideHeader && (
            <div className="header flex flex-row">
              <img
                className="w-[150px] h-[150px] object-contain"
                src={logo}
                alt=""
              />
              <div className="wrapper">
                <h1 className="text-5xl font-bold">WELCOME</h1>
                <p className="text-lg">
                  Web-Based: Tournament Management System
                </p>
                <p className="text-lg">Strive, Succeed, Celebrate</p>
              </div>
            </div>
          )}

          <div
            style={{
              background:
                "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
              minHeight: "20vh",
              minWidth: "45rem",
            }}
            className="content rounded-lg p-10"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
