"use client";

import { Badge, Button, Card, Tooltip, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useCrudParticipants from "../hooks/useCrudParticipants";
import useCrudMatches from "../hooks/useCrudMatches";
import useCrudLogs from "../hooks/useCrudLogs";
import { useStore } from "../zustand/store";

export default function MatchCard({ match, id, client, tournament }) {
  const { showParticipant } = useCrudParticipants();
  const { updateMatchWinner, getMatchDate } = useCrudMatches();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [matchData, setMatchData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);

  const { addLog } = useCrudLogs();
  const { currentUser } = useStore();
  const getBadgeColor = (state) => {
    switch (state) {
      case "pending":
        return "bg-red-500";
      case "open":
        return "bg-blue-500";
      case "complete":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleGetPlayer = async (playerId, setPlayer) => {
    if (playerId) {
      const output = await showParticipant(id, playerId);
      const { participant } = output.data;
      setPlayer(participant);
    }
  };

  useEffect(() => {
    handleGetPlayer(match.player1_id, setPlayer1);
    handleGetPlayer(match.player2_id, setPlayer2);
    getMatchDate(id, match.id, setMatchData);
  }, []);

  const openModal = (winnerId) => {
    setSelectedWinner(winnerId);
    setIsModalOpen(true);
  };

  const confirmWinner = () => {
    const winnerName =
      selectedWinner === player1?.id ? player1?.name : player2?.name;
    const winnerPlayer = selectedWinner === player1?.id ? "player1" : "player2";
    console.log(winnerPlayer);

    updateMatchWinner(id, match.id, selectedWinner, winnerPlayer);
    const logsLabel = `${winnerName} won in round ${match.round} of the tournament ${tournament.name}.`;
    addLog(currentUser, logsLabel);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
    setIsModalOpen(false);
  };

  const handleDraw = () => {
    updateMatchWinner(id, match.id, "tie");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    setIsModalOpen(false);
  };

  return (
    <Card
      className="max-w-sm md:w-96 sm:w-80 w-full my-5 p-5 border shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700"
      style={{
        background:
          "linear-gradient(164deg, rgba(2,6,23,1) 59%, rgba(252,172,127,1) 91%)",
      }}
    >
      <div className="header flex justify-between items-center mb-5">
        <div
          className={`${getBadgeColor(match.state)} rounded-full w-8 h-8`}
        ></div>
        <Badge size="lg" color="info">
          Round {match.round}
        </Badge>
      </div>

      <div className="opponents text-left">
        <div className="flex items-center justify-start">
          <h5 className="text-lg p-2 font-semibold tracking-tight text-white dark:text-white mb-3">
            {player1?.name || (
              <Badge size="lg" color="gray">
                Waiting for opponent
              </Badge>
            )}
          </h5>
          {match.state == "complete" && (
            <>
              {match.winner_id === player1?.id ? (
                <Badge size={"sm"} color={"success"}>
                  Winner
                </Badge>
              ) : (
                <Badge size={"sm"} color={"failure"}>
                  Loser
                </Badge>
              )}
            </>
          )}
        </div>

        <h5 className="text-2xl font-bold tracking-tight mb-3 text-blue-500">
          VS
        </h5>
        <div className="flex items-center justify-start">
          <h5 className="text-lg p-2 font-semibold tracking-tight text-white dark:text-white mb-3">
            {player2?.name || (
              <Badge size="lg" color="gray">
                Waiting for opponent
              </Badge>
            )}
          </h5>
          {match.state == "complete" && (
            <>
              {match.winner_id === player2?.id ? (
                <Badge size={"sm"} color={"success"}>
                  Winner
                </Badge>
              ) : (
                <Badge size={"sm"} color={"failure"}>
                  Loser
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {/* {match?.state === "complete" && (
        <div className="winner-display text-center mt-10">
          <h5 className="text-lg font-bold tracking-tight text-white dark:text-white">
            Winner 🎉🎉🎉
          </h5>
          <h5 className="text-lg font-bold tracking-tight mt-3 text-white dark:text-white">
            {match.winner_id === player1?.id ? player1?.name : player2?.name}
          </h5>
        </div>
      )} */}

      {matchData && (
        <div className="winner-selection text-center mt-5">
          <h5 className="text-lg text-white mb-3">Who is the winner?</h5>
          <div className="flex justify-around items-center space-x-3">
            <Tooltip content={player1?.name || "Player 1"}>
              <Button
                onClick={() => openModal(match.player1_id)}
                className="w-32 hover:bg-blue-700"
              >
                Player 1
              </Button>
            </Tooltip>
            <Tooltip content={player2?.name || "Player 2"}>
              <Button
                onClick={() => openModal(match.player2_id)}
                color="pink"
                className="w-32 hover:bg-pink-700"
              >
                Player 2
              </Button>
            </Tooltip>
            <Tooltip content={"Draw the game"}>
              <Button
                onClick={handleDraw}
                color="pink"
                className="w-32 hover:bg-pink-700"
              >
                Draw
              </Button>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Modal for confirming winner */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        position="center"
      >
        <Modal.Header>
          <h5 className="text-xl font-bold text-white dark:text-white">
            Confirm Winner
          </h5>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300">
            Are you sure you want to set{" "}
            <span className="font-semibold text-blue-500">
              {selectedWinner === player1?.id ? player1?.name : player2?.name}
            </span>{" "}
            as the winner?
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-center space-x-3">
          <Button
            onClick={confirmWinner}
            className="px-5 py-2 bg-green-500 hover:bg-green-700 text-white"
          >
            Confirm
          </Button>
          <Button
            color="gray"
            onClick={() => setIsModalOpen(false)}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-500 text-gray-700"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
