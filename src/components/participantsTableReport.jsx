"use client";

import { Button, Table, Modal } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ParticipantsTablesReport({
  participants,
  handleDeleteParticipant,
  tournament,
  removeRanking,
  client,
}) {
  // State for modal visibility and selected participant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);

  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Open the confirmation modal and set the selected participant ID
  const openModal = (participantId) => {
    setSelectedParticipantId(participantId);
    setIsModalOpen(true);
  };

  // Confirm deletion and close modal
  const confirmDelete = () => {
    handleDeleteParticipant(selectedParticipantId);
    setIsModalOpen(false);
    setSelectedParticipantId(null);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head className="bg-slate-950">
          <Table.HeadCell className="bg-slate-800 text-white">
            <h1 className="text-lg">Participant Name</h1>
          </Table.HeadCell>
          {!removeRanking && (
            <Table.HeadCell className="bg-slate-800 text-white">
              <h1 className="text-lg">Ranking</h1>
            </Table.HeadCell>
          )}
          {!client && (
            <Table.HeadCell className="bg-slate-800 text-white flex justify-center items-center">
              <h1 className="text-lg">Action</h1>
            </Table.HeadCell>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {participants.map((item, index) => {
            const { participant } = item;

            return (
              <motion.tr
                key={participant.id}
                className="bg-slate-700 text-white"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Table.Cell className="text-white">
                  {participant.name}
                </Table.Cell>
                {!removeRanking && (
                  <Table.Cell className="text-white">
                    {participant.final_rank ? participant.final_rank : "----"}
                  </Table.Cell>
                )}
                {!client && (
                  <Table.Cell className="text-white flex justify-center items-center">
                    <Button
                      disabled={tournament?.state !== "pending"}
                      onClick={() => openModal(participant.id)}
                      color={"failure"}
                    >
                      Delete Participant
                    </Button>
                  </Table.Cell>
                )}
              </motion.tr>
            );
          })}
        </Table.Body>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this participant?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
