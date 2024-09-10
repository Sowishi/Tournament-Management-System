"use client";

import { Badge, Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo2.png";
import useCrudParticipants from "../hooks/useCrudParticipants";
import { useEffect, useState } from "react";

export default function MatchCard({ match, id }) {
  const { showParticipant } = useCrudParticipants();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const getBadgeColor = (state) => {
    if (state == "pending") {
      return "warning";
    }
    if (state == "open") {
      return "success";
    }
  };

  const handleGetPlayer1 = async () => {
    const userID = match.player1_id;
    if (userID) {
      const output = await showParticipant(id, userID);
      const { participant } = output.data;
      setPlayer1(participant);
    }
    return null;
  };

  const handleGetPlayer2 = async () => {
    const userID = match.player2_id;
    if (userID) {
      const output = await showParticipant(id, userID);
      const { participant } = output.data;
      setPlayer2(participant);
    }
    return null;
  };

  useEffect(() => {
    handleGetPlayer1();
    handleGetPlayer2();
  }, []);

  return (
    <Card className="max-w-sm bg-slate-800 dark shadow-2xl basis-4/12">
      <div className="wrapper flex items-center justify-star">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Round {match?.round}
        </h5>
        <Badge color={getBadgeColor(match?.state)} size={"lg"} className="ml-3">
          {match?.state}
        </Badge>
      </div>

      <div className="oponents">
        <h5 className="text-lg font-bold tracking-tight my-3 text-gray-900 dark:text-white">
          {player1?.name ? (
            player1?.name
          ) : (
            <Badge className="flex my-2" size={"lg"}>
              Waiting for opponent
            </Badge>
          )}
        </h5>
        <h5 className="text-2xl font-bold tracking-tight my-3 text-gray-900 dark:text-white">
          <span className="text-blue-500">V</span>
          <span className="text-red-500">S</span>
        </h5>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {player2?.name ? (
            player2?.name
          ) : (
            <Badge className="flex my-2" size={"lg"}>
              Waiting for opponent
            </Badge>
          )}
        </h5>
      </div>

      {/* <div className="flex">
        <Button
          onClick={() => {
            setSelectedTournament(data);
            setShowModal(true);
            navigation(`/admin/tournament/${data.url}`);
          }}
        >
          View Tournament
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button
          color={"failure"}
          className="mx-3"
          onClick={async () => {
            const res = await deleteTournament(tournament);
            if (res.error) {
              toast.error(res.message);
              return;
            }
            toast.success(res.message);
            window.location.reload();
          }}
        >
          Delete
        </Button>
      </div> */}
    </Card>
  );
}
