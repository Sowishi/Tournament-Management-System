import { Button, Table, Modal } from "flowbite-react";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useState, useEffect } from "react";
import moment from "moment";
import useCrudTally from "../hooks/useCrudTally";

const RaceRankingTable = ({ participants, race }) => {
  const [rankedParticipants, setRankedParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addTally } = useCrudTally();

  const calculateRankingAndDifferences = () => {
    if (!participants || participants.length === 0) return;

    const sortedParticipants = [...participants].sort((a, b) =>
      moment(a.time, "HH:mm:ss.SSS").diff(moment(b.time, "HH:mm:ss.SSS"))
    );

    const updatedParticipants = sortedParticipants.map((participant, index) => {
      const bestTime = moment(sortedParticipants[0].time, "HH:mm:ss.SSS");
      const currentTime = moment(participant.time, "HH:mm:ss.SSS");

      const difference = moment
        .utc(currentTime.diff(bestTime))
        .format("HH:mm:ss.SSS");

      const previousTime =
        index > 0
          ? moment(sortedParticipants[index - 1].time, "HH:mm:ss.SSS")
          : null;
      const gap = previousTime
        ? moment.utc(currentTime.diff(previousTime)).format("HH:mm:ss.SSS")
        : "00:00:00.000";

      return {
        ...participant,
        rank: index + 1,
        diff: index === 0 ? "00:00:00.000" : difference,
        gap: index === 0 ? "00:00:00.000" : gap,
      };
    });

    setRankedParticipants(updatedParticipants);
  };

  useEffect(() => {
    calculateRankingAndDifferences();
  }, [participants]);

  const handleFinalize = () => {
    setIsModalOpen(true);
  };

  const confirmTally = () => {
    console.log(rankedParticipants);
    rankedParticipants.forEach((item) => {
      addTally({
        name: item.collegeName,
        rank: item.rank || "Unranked",
        event: item.sportsEvent,
        tournamentName: race.tournament.tournamentName,
      });
    });
    setIsModalOpen(false);
  };

  const getRankLabel = (rank) => {
    if (rank === 1) {
      return (
        <span className="flex items-center gap-2 text-yellow-400">
          <FaMedal className="text-yellow-400" /> Top 1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="flex items-center gap-2 text-gray-400">
          <FaMedal className="text-gray-400" /> Top 2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="flex items-center gap-2 text-orange-500">
          <FaMedal className="text-orange-500" /> Top 3
        </span>
      );
    }
    return rank;
  };

  return (
    <>
      {race.status === "Awaiting_Review" && (
        <div className="flex justify-end items-center w-full mb-5">
          <Button color="success" className="mr-3" onClick={handleFinalize}>
            Submit to tally
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
              <Table.HeadCell className="px-6 py-3 uppercase tracking-wider p-5 bg-slate-900 text-white">
                Gap
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-700">
              {rankedParticipants.map((item) => (
                <Table.Row
                  key={item.id}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {getRankLabel(item.rank)}
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
                  <Table.Cell className="px-6 py-4 text-lg font-bold">
                    {item.gap}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Confirm Finalization</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to finalize and submit the tally?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={confirmTally}>
            Confirm
          </Button>
          <Button color="failure" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RaceRankingTable;
