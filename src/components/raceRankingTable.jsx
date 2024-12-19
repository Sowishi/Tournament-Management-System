import { Button, Table, Modal } from "flowbite-react";
import { FaTrophy } from "react-icons/fa";
import { useState } from "react";
import useCrudRace from "../hooks/useCrudRace";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const RaceRankingTable = ({ participants, race }) => {
  const [rankedParticipants, setRankedParticipants] = useState([]);

  const calculateRankingAndDifference = () => {
    if (!participants || participants.length === 0) return;

    // Sort participants by time in ascending order
    const sortedParticipants = [...participants].sort((a, b) =>
      moment(a.time, "HH:mm:ss.SSS").diff(moment(b.time, "HH:mm:ss.SSS"))
    );

    // Assign ranks and calculate differences
    const updatedParticipants = sortedParticipants.map((participant, index) => {
      const bestTime = moment(sortedParticipants[0].time, "HH:mm:ss.SSS");
      const currentTime = moment(participant.time, "HH:mm:ss.SSS");
      const difference = moment
        .utc(currentTime.diff(bestTime))
        .format("HH:mm:ss.SSS");

      return {
        ...participant,
        rank: index + 1,
        diff: index === 0 ? "00:00:00.000" : difference, // No difference for the first-place participant
      };
    });

    setRankedParticipants(updatedParticipants);
  };

  // Recalculate ranking and difference when participants change
  useState(() => {
    calculateRankingAndDifference();
  }, [participants]);

  const handleFinalize = () => {
    // Logic to finalize the tournament
    console.log("Finalizing the tournament...");
  };

  return (
    <>
      {race.status === "Underway" && (
        <div className="flex justify-end items-center w-full mb-5">
          <Button color="success" className="mr-3" onClick={handleFinalize}>
            Finalize Tournament
          </Button>
        </div>
      )}
      <div className="w-full min-h-[600px] bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-400" /> Race Participants
        </h2>
        <div className="overflow-x-auto">
          <Table hoverable={true}>
            <Table.Head className="bg-black">
              <Table.HeadCell className="px-6 py-3 uppercase bg-slate-900 text-white tracking-wider p-5">
                Rank
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 uppercase bg-slate-900 text-white tracking-wider p-5">
                Participant
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 uppercase tracking-wider p-5 bg-slate-900 text-white">
                Time
              </Table.HeadCell>
              <Table.HeadCell className="px-6 py-3 uppercase tracking-wider p-5 bg-slate-900 text-white">
                Difference
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-700">
              {rankedParticipants.map((item) => (
                <Table.Row
                  key={item.id}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {item.rank}
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {item.collegeName}
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {item.time}
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {item.diff}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default RaceRankingTable;
