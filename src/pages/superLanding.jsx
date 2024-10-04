import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import "../tms.css";
import { useStore } from "../zustand/store";
const SuperLanding = () => {
  const navigate = useNavigate();
  const { setGuest } = useStore();
  return (
    <div className="flex-1 h-screen bg-white relative">
      <div className="absolute top-10">
        <h1 className="uppercase font-bold text-9xl text-dark z-0 text-center opacity-50">
          Web-based tournament management system
        </h1>
      </div>

      <div className="flex z-10 absolute w-full">
        <div
          onClick={() => {
            navigate("/home");
            setGuest(true);
          }}
          className="tms-card basis-4/12 h-screen flex justify-center items-center "
        >
          <div className="w-10/12 h-[20rem] bg-[#7695FF] shadow-lg rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-3xl mb-5">
                View Tournament
              </h1>
              <img src={logo} width={150} />
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/login")}
          className="tms-card basis-4/12 h-screen flex justify-center items-center "
        >
          <div className="w-10/12 h-[20rem] bg-[#FF9874] shadow-lg rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-3xl mb-5">
                Login to your account
              </h1>
              <img src={logo} width={150} />
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/login")}
          className="tms-card basis-4/12 h-screen flex justify-center items-center "
        >
          <div className="w-10/12 h-[20rem] bg-slate-700 shadow-lg rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-3xl mb-5">
                Admin Login
              </h1>
              <img src={logo} width={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperLanding;
