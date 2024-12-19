import { Button, Table, Modal } from "flowbite-react";
import { FaTrophy } from "react-icons/fa";
import { useState } from "react";
import useCrudRace from "../hooks/useCrudRace";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const formatTime = (time) => {
  if (!time) return "---";

  const totalMilliseconds = parseInt(time, 10); // Ensure time is a number
  const hours = Math.floor(totalMilliseconds / (60 * 60 * 1000));
  const minutes = Math.floor(
    (totalMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
  );
  const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

const parseTimeInput = (timeString) => {
  const [hours, minutes, seconds, milliseconds] = timeString
    .split(/[:.]/)
    .map(Number);

  const totalMilliseconds =
    (hours || 0) * 60 * 60 * 1000 +
    (minutes || 0) * 60 * 1000 +
    (seconds || 0) * 1000 +
    (milliseconds || 0);

  return totalMilliseconds;
};

const RaceMatchTable = ({ participants, race }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [times, setTimes] = useState(
    participants.reduce((acc, item) => {
      acc[item.id] = item.time ? formatTime(item.time) : "---";
      return acc;
    }, {})
  );

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

  const handleTimeChange = (id, momentObj) => {
    if (!momentObj.isValid()) return;

    const timeString = momentObj.format("HH:mm:ss.SSS"); // Format to "HH:mm:ss.SSS"
    const timeInMs = parseTimeInput(timeString);

    setTimes((prev) => ({
      ...prev,
      [id]: timeString,
    }));

    // Convert the time to "HH-MM-SS-SSS" format
    const formattedTime = momentObj.format("HH-mm-ss-SSS");

    console.log(`Updated time for participant ${id}: ${formattedTime}`);
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
            {participants.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.rank || "---"}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  {item.collegeName}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 text-lg font-bold">
                  <Datetime
                    dateFormat={false}
                    timeFormat="HH:mm:ss.SSS"
                    value={times[item.id] === "---" ? "" : times[item.id]}
                    onChange={(moment) => handleTimeChange(item.id, moment)}
                    className="text-black"
                    inputProps={{
                      placeholder: "hh:mm:ss:ms", // Placeholder text
                      readOnly: true,
                    }}
                  />
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
