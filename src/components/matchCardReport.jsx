"use client";

import { useEffect, useState } from "react";
import useCrudParticipants from "../hooks/useCrudParticipants";
import useCrudMatches from "../hooks/useCrudMatches";
import { useStore } from "../zustand/store";

export default function MatchReport({ match, id, tournament }) {
  const { showParticipant } = useCrudParticipants();
  const { getMatchDate } = useCrudMatches();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const { currentUser } = useStore();

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
    <div className="p-5 my-5 border border-slate-900 rounded-md text-dark">
      <h2 className="text-2xl font-bold text-center mb-5">
        Match Report - Round {match.round}
      </h2>
      <div className="mb-3">
        <p className="text-lg">
          <strong>Tournament:</strong> {tournament.name}
        </p>
        <p className="text-lg">
          <strong>Match Status:</strong> {match.state.toUpperCase()}
        </p>
      </div>

      <div className="space-y-3">
        <div className=" p-3 rounded-md">
          <p className="text-lg">
            <strong>Player 1:</strong>{" "}
            {player1?.name || (
              <span className="italic">Waiting for opponent</span>
            )}
            {match.state === "complete" && (
              <span className="ml-2 text-sm">
                {match.winner_id === player1?.id ? "(Winner)" : "(Loser)"}
              </span>
            )}
          </p>
        </div>

        <p className="text-center text-xl text-dark font-semibold">VS</p>

        <div className=" p-3 rounded-md">
          <p className="text-lg">
            <strong>Player 2:</strong>{" "}
            {player2?.name || (
              <span className="italic">Waiting for opponent</span>
            )}
            {match.state === "complete" && (
              <span className="ml-2 text-sm">
                {match.winner_id === player2?.id ? "(Winner)" : "(Loser)"}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-600 pt-3">
        <p className="text-lg">
          <strong>Round:</strong> {match.round}
        </p>
        <p className="text-lg">
          <strong>Match State:</strong>{" "}
          {match.state.charAt(0).toUpperCase() + match.state.slice(1)}
        </p>
      </div>
    </div>
  );
}
