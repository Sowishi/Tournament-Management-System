"use client";

import { Badge, Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCrudParticipants from "../hooks/useCrudParticipants";
import useCrudMatches from "../hooks/useCrudMatches";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetUsers from "../hooks/useGetUsers";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function MatchDateCard({ match, id, tournamentID }) {
  const { showParticipant } = useCrudParticipants();
  const { updateMatchWinner, updateMatchDate, getMatchDate, deleteMatchData } =
    useCrudMatches();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [matchData, setMatchData] = useState();

  const { data: users } = useGetUsers();

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

  const handleDateSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End date must be after the start date.");
      return;
    }

    users.map((user) => {
      if (!user.role) {
        if (
          user.collegeName == player1?.name ||
          user.collegeName == player2?.name
        ) {
          const notifRef = collection(db, "notifications");
          return addDoc(notifRef, {
            message: `You have been scheduled for a match with ${
              user.collegeName == player1.name ? player2.name : player1.name
            }.`,
            ownerID: user.id,
            createdAt: serverTimestamp(),
          });
        }
      }
    });

    updateMatchDate(
      startDate,
      endDate,
      tournamentID,
      player1?.name + " VS " + player2?.name,
      match.id
    );

    toast.success("Match dates updated successfully!");
  };

  useEffect(() => {
    handleGetPlayer(match.player1_id, setPlayer1);
    handleGetPlayer(match.player2_id, setPlayer2);
    getMatchDate(tournamentID, match.id, setMatchData);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="w-[25rem] h-[35rem] my-5 border flex flex-col justify-between dark"
          style={{
            background:
              "linear-gradient(164deg, rgba(2,6,23,1) 59%, rgba(252,172,127,1) 91%)",
          }}
        >
          <motion.div
            className="header flex justify-between items-center mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div
              className={`${getBadgeColor(match.state)} rounded-full w-8 h-8`}
            ></div>
            <Badge size="lg" color="info">
              Round {match.round}
            </Badge>
          </motion.div>

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

          <div className="date-picker text-center mt-5">
            <label htmlFor="startDate" className="text-white block mb-2">
              Select Start Date and Time:
            </label>
            <DatePicker
              disabled={matchData}
              selected={matchData ? matchData.start : startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="rounded  p-2 w-full bg-gray-800 text-white mb-4"
              placeholderText="Select start date and time"
            />

            <label htmlFor="endDate" className="text-white block mb-2">
              Select End Date and Time:
            </label>
            <DatePicker
              disabled={matchData}
              selected={matchData ? matchData.end : endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="rounded  p-2 w-full bg-gray-800 text-white"
              placeholderText="Select end date and time"
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4"
            >
              {!matchData ? (
                <Button
                  onClick={handleDateSubmit}
                  color="success"
                  className="w-full"
                >
                  Submit Match Dates
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    deleteMatchData(tournamentID, match.id);
                    setMatchData(undefined);
                  }}
                  color="failure"
                  className="w-full"
                >
                  Remove Date
                </Button>
              )}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
