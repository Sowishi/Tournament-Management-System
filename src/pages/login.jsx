import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import img19 from "../assets/image 19.png";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout>
      <h1 className="text-white font-bold text-2xl text-center">
        Login to your account
      </h1>
      <TmsInput placeHolder="Enter your username" label="Username" />
      <TmsInput placeHolder="Enter your password" label="Password" />

      <Button className="w-full mt-5" gradientMonochrome="info">
        Login
      </Button>
      <div className="flex justify-between items-center mt-5">
        <div className="wrapper flex items-center ">
          <p>Forgot Password?</p>

          <Button size={"xs"} className="ml-2">
            Reset here.
          </Button>
        </div>
        <div className="wrapper flex items-center ">
          <p>Dont' have an account?</p>

          <Button size={"xs"} className="ml-2">
            <Link to={"/registration"}> Create an account</Link>
          </Button>
        </div>
      </div>

      <div className="flex mt-2"></div>
    </AuthLayout>
  );
};

export default Login;
