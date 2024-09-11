"use client";

import { Badge, Button, Card, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo2.png";
import useCrudParticipants from "../hooks/useCrudParticipants";
import { useEffect, useState } from "react";
import useCrudMatches from "../hooks/useCrudMatches";

export default function MatchCard({ match, id }) {
  const { showParticipant } = useCrudParticipants();
  const { updateMatchWinner } = useCrudMatches();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const getBadgeColor = (state) => {
    console.log(state);
    if (state == "pending") {
      return "bg-red-500";
    } else if (state == "open") {
      return "bg-blue-500";
    } else if (state == "complete") {
      return "bg-green-500";
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
    <Card
      className="max-w-sm min-h-[29rem] border basis-4/12 my-5 dark"
      style={{
        background: "rgb(2,6,23)",
        background:
          "linear-gradient(164deg, rgba(2,6,23,1) 59%, rgba(252,172,127,1) 91%)",
      }}
    >
      <div className="container mx-auto  h-100">
        <div className="header flex justify-between items-center">
          <div className="flex items-center justify-start">
            <div
              className={`${getBadgeColor(match.state)}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
              }}
            ></div>
          </div>
          <Badge size={"lg"} color={"info"} className="ml-2">
            Round {match.round}
          </Badge>
        </div>
      </div>
      {match?.state !== "complete" && (
        <>
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
          <h5 className="text-lg text-white mt-5">Who is the winner?</h5>
          <div className="flex justify-around items-center">
            <Tooltip content={`${player1?.name}`}>
              <Button
                onClick={() => {
                  updateMatchWinner(id, match.id, match.player1_id);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                disabled={match.state != "open"}
                className="w-full px-5"
              >
                Player 1
              </Button>
            </Tooltip>
            <Tooltip content={`${player2?.name}`}>
              <Button
                onClick={() => {
                  updateMatchWinner(id, match.id, match.player2_id);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                disabled={match.state != "open"}
                color={"pink"}
                className="w-full px-5"
              >
                Player 2
              </Button>
            </Tooltip>
          </div>
        </>
      )}
      {match?.state == "complete" && (
        <>
          {match.winner_id == player1?.id && (
            <>
              <h5 className="text-2xl mt-20 border-b-4 pb-5 font-bold tracking-tight text-gray-900 dark:text-white">
                Winner 🎉🎉🎉
              </h5>
              <h5 className="text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                {player1?.name}
              </h5>
            </>
          )}
          {match.winner_id == player2?.id && (
            <>
              <h5 className="text-2xl mt-20 border-b-4 pb-5 font-bold tracking-tight text-gray-900 dark:text-white">
                Winner 🎉🎉🎉
              </h5>
              <h5 className="text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                {player2?.name}
              </h5>
            </>
          )}
        </>
      )}
    </Card>
  );
}
