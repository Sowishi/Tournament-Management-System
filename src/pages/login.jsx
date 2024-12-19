import { Button, Label, TextInput } from "flowbite-react";
import logo from "../assets/logo2.png";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { useStore } from "../zustand/store";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import welcomeAnim from "../assets/Animation - 1707144264244 (1).json";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useGetUsers();
  const { setCurrentUser, setGuest, setCurrentAdmin, setCurrentEvent } =
    useStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    let userFound = false;
    data?.map((user) => {
      if (user.userType === "admin") {
        if (user.email === email && user.password === password) {
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentAdmin(user);
          userFound = true;
          if (user.role === "Tournament Manager") {
            if (user.tournamentMode == "bracket") {
              navigate(`/tournament/${user.tournamentID}`);
            } else {
              navigate(`/time-trial/${user.tournamentID}`);
            }
          } else {
            navigate("/admin/home");
          }
        }
        return;
      }

      if (user.email === email && user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        setCurrentUser(user);
        userFound = true;
        navigate("/home");
      }
    });

    if (!userFound) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = localStorage.getItem("user");
      const user = await JSON.parse(res);

      if (user?.userType === "admin") {
        setCurrentAdmin(user);
      }
      if (user) {
        setCurrentUser(user);
      } else {
        setGuest(true);
      }
    };

    getUsers();
  }, []);

  return (
    <AuthLayout>
      <div className="flex justify-center items-center">
        <div className="basis-10/12 flex justify-center items-center">
          <div
            className="container rounded-lg p-14 mx-10"
            style={{
              margin: "0 auto",
              background: "rgba(16, 18, 27, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "10px",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex justify-center items-center flex-col md:flex-row">
              <h1 className="text-white font-bold text-sm md:text-2xl text-center uppercase">
                Login to your web-based tournament management system
              </h1>
              <img src={logo} width={100} alt="logo" />
            </div>

            <TmsInput
              onChange={(event) => setEmail(event.target.value)}
              placeHolder="Enter your email"
              label="Email"
            />

            <div className="relative">
              <TmsInput
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                placeHolder="Enter your password"
                label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 top-8 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5" />
                ) : (
                  <FaEye className="w-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end items-center mt-2">
              <Button size={"xs"} onClick={() => navigate("/forgot")}>
                Forgot Password?
              </Button>
            </div>

            <div className="flex justify-center items-center">
              <Button
                onClick={() => navigate("/home")}
                className="w-8/12 mt-5 py-2"
                gradientMonochrome="success"
              >
                Guest
              </Button>
              <Button
                onClick={handleLogin}
                className="w-8/12 mt-5 py-2 mx-3"
                gradientMonochrome="info"
              >
                Login
              </Button>
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="wrapper flex items-center "></div>
              <div className="wrapper flex items-center ">
                <p className="text-white text-sm">Don't have an account?</p>
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
