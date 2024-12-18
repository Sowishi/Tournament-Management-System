import { FaTrophy } from "react-icons/fa";

const RaceTable = () => {
  const raceData = [
    { rank: 1, participant: "John Doe", time: "00:58.32", difference: "+0.00" },
    {
      rank: 2,
      participant: "Jane Smith",
      time: "01:00.15",
      difference: "+1.83",
    },
    {
      rank: 3,
      participant: "Alex Johnson",
      time: "01:02.45",
      difference: "+4.13",
    },
    {
      rank: 4,
      participant: "Chris Lee",
      time: "01:05.21",
      difference: "+6.89",
    },
    { rank: 1, participant: "John Doe", time: "00:58.32", difference: "+0.00" },
    {
      rank: 2,
      participant: "Jane Smith",
      time: "01:00.15",
      difference: "+1.83",
    },
    {
      rank: 3,
      participant: "Alex Johnson",
      time: "01:02.45",
      difference: "+4.13",
    },
    {
      rank: 4,
      participant: "Chris Lee",
      time: "01:05.21",
      difference: "+6.89",
    },
  ];

  return (
    <div className="w-full  bg-gray-800 rounded-lg shadow-lg">
      <table className="min-w-full table-auto text-white">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Participant
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Difference
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {raceData.map((item, index) => (
            <tr
              key={index}
              className={`${
                item.rank === 1
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-800 hover:bg-gray-700"
              } transition-colors duration-200`}
            >
              <td className="px-6 py-4 flex items-center">
                {item.rank === 1 ? (
                  <FaTrophy className="text-yellow-300 mr-2 text-lg" />
                ) : (
                  <span className="text-gray-300 mr-2">{item.rank}</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium">{item.participant}</td>
              <td className="px-6 py-4">{item.time}</td>
              <td className="px-6 py-4">{item.difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceTable;
