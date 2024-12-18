"use client";

import { Table, Button, Modal } from "flowbite-react";
import { FaCrown, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo2.png";
import useCrudTally from "../hooks/useCrudTally";
import { useStore } from "../zustand/store";
import useCrudPoints from "../hooks/useCrudPoints";
import getLatestTimestamp from "../utils/getLatestTimestamp";

export function TallyTable() {
  const { data } = useCrudTally();
  const { getPoints } = useCrudPoints();

  const { currentEvent } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [points, setPoints] = useState();
  const parseEvent = async (event) => {
    return await JSON.parse(event);
  };

  useEffect(() => {
    if (currentEvent) {
      getPoints(currentEvent, setPoints);
    }
    const filterData = async () => {
      const filtered = await Promise.all(
        data.map(async (item) => {
          const info = await parseEvent(item.event);
          return info.eventName === currentEvent ? item : null;
        })
      );
      setFilteredData(filtered.filter(Boolean)); // Remove null values
    };

    if (data.length > 0 && currentEvent) {
      filterData();
    }
  }, [data, currentEvent]);

  // Group and count medals for each institution
  const rankCounts = filteredData.reduce((acc, item) => {
    const institution = item.name; // Institution name
    const rank = item.rank; // Rank field (1 = Gold, 2 = Silver, 3 = Bronze)

    if (!acc[institution]) {
      acc[institution] = {
        Gold: 0,
        Silver: 0,
        Bronze: 0,
        tournaments: [],
        Points: 0, // Default points
      };
    }

    if (rank === 1) {
      acc[institution].Gold += 1;
      acc[institution].Points += parseInt(points?.gold); // Gold = 20 points
      acc[institution].tournaments.push({
        tournamentName: item.tournamentName,
        medal: "Gold",
      });
    }
    if (rank === 2) {
      acc[institution].Silver += 1;
      acc[institution].Points += parseInt(points?.silver); // Silver = 10 points
      acc[institution].tournaments.push({
        tournamentName: item.tournamentName,
        medal: "Silver",
      });
    }
    if (rank === 3) {
      acc[institution].Bronze += 1;
      acc[institution].Points += parseInt(points?.Bronze); // Bronze = 5 points
      acc[institution].tournaments.push({
        tournamentName: item.tournamentName,
        medal: "Bronze",
      });
    }

    return acc;
  }, {});

  // Convert rankCounts object to an array and sort by Gold, Silver, and Bronze
  const sortedRankData = Object.entries(rankCounts)
    .map(([institution, counts]) => ({ institution, ...counts }))
    .sort((a, b) => {
      if (b.Gold !== a.Gold) return b.Gold - a.Gold;
      if (b.Silver !== a.Silver) return b.Silver - a.Silver;
      return b.Bronze - a.Bronze;
    });

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleOpenModal = (institution) => {
    setSelectedInstitution(institution);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  if (filteredData.length <= 0) {
    return (
      <div className="container h-[20rem] text-2xl font-bold opacity-50 mx-auto flex justify-center items-center">
        <p>There's no tally as of the moment...</p>
      </div>
    );
  }

  const latestTimestamp = getLatestTimestamp(data);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-right mb-3 text-lg">
        Ranking as of{" "}
        <span className="text-lg text-blue-500 font-bold">
          {" "}
          {latestTimestamp}
        </span>
      </h1>

      <Table className="min-w-full text-center text-gray-100">
        <Table.Head>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold">Rank</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold">Institution</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold text-yellow-400">Gold</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold text-slate-400">Silver</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold text-amber-900">Bronze</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold text-white">Points</h1>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {sortedRankData.map((item, index) => {
            const rankIcon =
              index === 0 ? (
                <FaCrown className="text-yellow-500 text-3xl" />
              ) : index === 1 ? (
                <FaMedal className="text-gray-300 text-3xl" />
              ) : index === 2 ? (
                <FaMedal className="text-orange-600 text-3xl" />
              ) : null;

            const rankStyle =
              index === 0
                ? "bg-yellow-300 bg-opacity-50"
                : index === 1
                ? "bg-gray-300 bg-opacity-50"
                : index === 2
                ? "bg-orange-300 bg-opacity-50"
                : "bg-gray-700";

            return (
              <motion.tr
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className={`text-black ${rankStyle} transition-all hover:bg-gray-600 cursor-pointer`}
                onClick={() => handleOpenModal(item)}
              >
                <Table.Cell className="p-4 text-lg font-medium">
                  <div className="flex items-center justify-center">
                    {rankIcon}
                    <span className="ml-2 text-black font-bold text-3xl">
                      {index + 1}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="p-4 text-lg font-medium text-black">
                  <div className="flex items-center">
                    <img
                      src={logo}
                      style={{ width: "50px" }}
                      alt={`${item.institution} logo`}
                      className="mr-3"
                    />
                    {item.institution}
                  </div>
                </Table.Cell>
                <Table.Cell className="p-4">{item.Gold}</Table.Cell>
                <Table.Cell className="p-4">{item.Silver}</Table.Cell>
                <Table.Cell className="p-4">{item.Bronze}</Table.Cell>
                <Table.Cell className="p-4 text-black text-3xl font-bold">
                  {item.Points}
                </Table.Cell>
              </motion.tr>
            );
          })}
        </Table.Body>
      </Table>

      {/* Modal for institution details */}
      {selectedInstitution && (
        <Modal show={isModalOpen} onClose={handleCloseModal} size="lg">
          <Modal.Header>
            Medals for {selectedInstitution.institution}
          </Modal.Header>
          <Modal.Body>
            <Table className="min-w-full text-center">
              <Table.Head>
                <Table.HeadCell>Tournament</Table.HeadCell>
                <Table.HeadCell>Medal</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {selectedInstitution.tournaments.map((tournament, idx) => (
                  <Table.Row key={idx} className="text-gray-700">
                    <Table.Cell>{tournament.tournamentName}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center">
                        {tournament.medal === "Gold" && (
                          <FaCrown className="text-yellow-500 text-xl mr-2" />
                        )}
                        {tournament.medal === "Silver" && (
                          <FaMedal className="text-gray-400 text-xl mr-2" />
                        )}
                        {tournament.medal === "Bronze" && (
                          <FaMedal className="text-orange-500 text-xl mr-2" />
                        )}
                        {tournament.medal}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleCloseModal}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
