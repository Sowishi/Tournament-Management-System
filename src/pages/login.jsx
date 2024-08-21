import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import img19 from "../assets/image 19.png";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { useStore } from "../zustand/store";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useGetUsers();
  const { setCurrentUser } = useStore();

  const navigate = useNavigate();

  const handleLogin = () => {
    let userFound = false;
    data?.map((user) => {
      if (user.email == email && user.password == password) {
        setCurrentUser(user);
        userFound = true;
        navigate("/");
      }
    });

    if (userFound == false) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="container mx-auto ">
        <h1 className="text-white font-bold text-2xl text-center">
          Login to your account
        </h1>
        <TmsInput
          onChange={(event) => setEmail(event.target.value)}
          placeHolder="Enter your email"
          label="Email"
        />
        <TmsInput
          type={"password"}
          onChange={(event) => setPassword(event.target.value)}
          placeHolder="Enter your password"
          label="Password"
        />
        <div className="flex justify-end items-center mt-2">
          <Link className="text-blue-950 font-bold" to={"/forgot"}>
            Forgot Password?
          </Link>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full mt-5"
          gradientMonochrome="info"
        >
          Login
        </Button>
        <div className="flex justify-between items-center mt-5">
          <div className="wrapper flex items-center "></div>
          <div className="wrapper flex items-center ">
            <p>Dont' have an account?</p>

            <Button size={"xs"} className="ml-2">
              <Link to={"/registration"}> Create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
