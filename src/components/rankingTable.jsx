"use client";

import { Button, Table, Modal } from "flowbite-react";
import { FaCrown, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import useCrudTally from "../hooks/useCrudTally";

export default function RankingTable({
  participants,
  handleDeleteParticipant,
  handleSubmitResults, // Function triggered on confirmation
  tournament,
  tournamentState,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addTally } = useCrudTally();
  // Sort participants by ascending rank
  const sortedParticipants = [...participants].sort((a, b) => {
    const rankA = a.participant.final_rank || Infinity;
    const rankB = b.participant.final_rank || Infinity;
    return rankA - rankB;
  });

  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Open modal and animate the button click
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and handle submit confirmation
  const handleConfirmSubmit = () => {
    // Log the ranking results to the console
    sortedParticipants.slice(0, 3).map((item) =>
      addTally({
        name: item.participant.name,
        rank: item.participant.final_rank || "Unranked",
        event: tournament.description,
      })
    );

    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <div className="wrapper">
        {/* Submit Results Button */}
        {tournamentState == "complete" && (
          <motion.div
            className="flex justify-end items-center my-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold rounded-lg"
            >
              Submit Results
            </Button>
          </motion.div>
        )}
      </div>

      <Table className="min-w-full text-center text-gray-100">
        <Table.Head>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold">Participant Name</h1>
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-300 p-5 bg-slate-800">
            <h1 className="text-lg font-bold">Ranking</h1>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {sortedParticipants.map((item, index) => {
            const { participant } = item;
            let rankIcon = null;
            let rankStyle = "";

            // Apply special styles for the top 3 ranks
            if (participant.final_rank === 1) {
              rankIcon = <FaCrown className="text-yellow-500 text-3xl" />;
              rankStyle = "bg-yellow-300 bg-opacity-50";
            } else if (participant.final_rank === 2) {
              rankIcon = <FaMedal className="text-gray-300 text-3xl" />;
              rankStyle = "bg-gray-300 bg-opacity-50";
            } else if (participant.final_rank === 3) {
              rankIcon = <FaMedal className="text-orange-600 text-3xl" />;
              rankStyle = "bg-orange-300 bg-opacity-50";
            }

            return (
              <motion.tr
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className={`text-white ${
                  rankStyle || "bg-gray-700"
                } transition-all hover:bg-gray-600`}
              >
                <Table.Cell className="p-4 text-lg font-medium">
                  {participant.name}
                </Table.Cell>
                <Table.Cell className="p-4 flex items-center justify-center space-x-2 text-lg font-medium">
                  {rankIcon}
                  <span>{participant.final_rank || "----"}</span>
                </Table.Cell>
              </motion.tr>
            );
          })}
        </Table.Body>
      </Table>

      {/* Confirmation Modal */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        className="text-gray-700"
      >
        <Modal.Header>Confirm Submission</Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Are you sure you want to submit the results?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleConfirmSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
