import AdminLayout from "../layout/adminLayout";
import { useNavigate } from "react-router-dom";
import { FaClock, FaProjectDiagram } from "react-icons/fa";

const SelectTournament = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Select Tournament Mode</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-3/4">
        {/* Time Trial Card */}
        <div
          onClick={() => navigate("/time-trial")}
          className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:shadow-2xl transition duration-300"
        >
          <FaClock className="text-blue-400 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold">Time Trial</h2>
          <p className="text-gray-300 mt-2 text-center">
            Compete against time to achieve the best result.
          </p>
        </div>

        {/* Bracket Card */}
        <div
          onClick={() => navigate("/admin/tournament")}
          className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:shadow-2xl transition duration-300"
        >
          <FaProjectDiagram className="text-green-400 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold">Bracket</h2>
          <p className="text-gray-300 mt-2 text-center">
            Compete in a knockout-style tournament bracket.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectTournament;
