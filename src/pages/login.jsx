import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import img19 from "../assets/image 19.png";
import TmsInput from "../components/tmsInput";

const Login = () => {
  return (
    <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
      <div className="basis-4/12">
        <img src={img19} alt="" />
      </div>
      <div className="basis-full flex justify-center items-center">
        <div className="wrapper">
          <div className="header flex flex-row">
            <img
              className="w-[150px] h-[150px] object-contain"
              src={logo}
              alt=""
            />
            <div className="wrapper">
              <h1 className="text-6xl font-bold">WELCOME</h1>
              <p className="text-lg">Web-Based: Tournament Management System</p>
              <p className="text-lg">Strive, Succeed, Celebrate</p>
            </div>
          </div>
          <div
            style={{
              background:
                "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
              minHeight: "20vh",
            }}
            className="content rounded-lg p-10"
          >
            <h1 className="text-white font-bold text-2xl text-center">
              Login to your account
            </h1>
            <TmsInput placeHolder="Enter your username" label="Username" />
            <TmsInput placeHolder="Enter your password" label="Password" />

            <Button className="w-full mt-5" gradientMonochrome="info">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
