"use client";

import { Badge, Button, Card, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import useCrudParticipants from "../hooks/useCrudParticipants";
import useCrudMatches from "../hooks/useCrudMatches";

export default function MatchCard({ match, id, client }) {
  const { showParticipant } = useCrudParticipants();
  const { updateMatchWinner } = useCrudMatches();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

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
  }, []);

  return (
    <Card
      className="w-80 h-[28rem] my-5 border flex flex-col justify-between dark"
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

      <div className="opponents text-center">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
          {player1?.name || (
            <Badge size="lg" color="gray">
              Waiting for opponent
            </Badge>
          )}
        </h5>
        <h5 className="text-2xl font-bold tracking-tight mb-3 text-blue-500">
          VS
        </h5>
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {player2?.name || (
            <Badge size="lg" color="gray">
              Waiting for opponent
            </Badge>
          )}
        </h5>
      </div>

      {match?.state === "open" && !client && (
        <div className="winner-selection text-center mt-5">
          <h5 className="text-lg text-white mb-3">Who is the winner?</h5>
          <div className="flex justify-around items-center space-x-3">
            <Tooltip content={player1?.name || "Player 1"}>
              <Button
                onClick={() => {
                  updateMatchWinner(id, match.id, match.player1_id);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                disabled={match.state !== "open"}
                className="w-32"
              >
                Player 1
              </Button>
            </Tooltip>
            <Tooltip content={player2?.name || "Player 2"}>
              <Button
                onClick={() => {
                  updateMatchWinner(id, match.id, match.player2_id);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                disabled={match.state !== "open"}
                color="pink"
                className="w-32"
              >
                Player 2
              </Button>
            </Tooltip>
          </div>
        </div>
      )}

      {match?.state === "complete" && (
        <div className="winner-display text-center mt-10">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Winner 🎉🎉🎉
          </h5>
          <h5 className="text-lg font-bold tracking-tight mt-3 text-gray-900 dark:text-white">
            {match.winner_id === player1?.id ? player1?.name : player2?.name}
          </h5>
        </div>
      )}
    </Card>
  );
}
