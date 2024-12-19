import { Button, Table, Modal } from "flowbite-react";
import { FaTrophy, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useCrudRace from "../hooks/useCrudRace";

const RaceMatchTable = ({ participants, race }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const { deleteParticipant } = useCrudRace();
  const openModal = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParticipant(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteParticipant(race.id, selectedParticipant.id);
    closeModal(); // Close the modal after deletion
  };

  return (
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
            {participants.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.rank || "---"}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.collegeName}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.time || "---"}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.diff || "---"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={isModalOpen} size="md" onClose={closeModal}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-bold">
              {selectedParticipant?.collegeName}
            </span>
            ? This action cannot be undone.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDelete}>
            Confirm
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RaceMatchTable;
