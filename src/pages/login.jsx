import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { useStore } from "../zustand/store";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import welcomeAnim from "../assets/Animation - 1707144264244 (1).json";

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
        navigate("/home");
      }
    });

    if (userFound == false) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="flex mx-20">
        <div className="basis-6/12  flex justify-center items-center">
          <Lottie
            animationData={welcomeAnim}
            style={{ width: 500 }}
            loop={true}
          />
        </div>
        <div className="basis-6/12 flex justify-center items-center ">
          <div
            className="container mx-auto rounded-lg p-14 mx-10"
            style={{
              background:
                "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
            }}
          >
            <div className="flex justify-center items-center">
              <h1 className="text-white font-bold text-2xl text-left uppercase">
                Login to your web-based tournament management system
              </h1>
              <img src={logo} width={100} alt="" />
            </div>

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

            <div className="flex justify-center items-center">
              <Button
                onClick={handleLogin}
                className="w-8/12 mt-5 py-2"
                gradientMonochrome="info"
              >
                Login
              </Button>
            </div>

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
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
