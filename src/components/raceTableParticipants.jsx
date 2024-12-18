import { Button } from "flowbite-react";
import { FaTrophy, FaTrashAlt } from "react-icons/fa";

const RaceTableParticipants = ({ raceData }) => {
  return (
    <div className="w-full min-h-[600px] bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FaTrophy className="text-yellow-400" /> Race Participants
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-white border-collapse border border-gray-700 rounded-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border border-gray-600">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border border-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {raceData.map((item, index) => (
              <tr
                key={index}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-lg font-bold flex items-center gap-3">
                  <FaTrophy className="text-yellow-400" /> {item.collegeName}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Button
                    color={"failure"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FaTrashAlt /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceTableParticipants;
