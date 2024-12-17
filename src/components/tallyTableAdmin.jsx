"use client";

import { Button, Modal, TextInput, Dropdown } from "flowbite-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import useCrudTally from "../hooks/useCrudTally";

export function TallyTableAdmin() {
  const { data, updateTally, deleteTally } = useCrudTally();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [updatedLog, setUpdatedLog] = useState({});

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleUpdate = (log) => {
    setSelectedLog(log);
    setUpdatedLog({ ...log });
    setShowUpdateModal(true);
  };

  const handleDelete = (logId) => {
    if (confirm("Are you sure you want to delete this log?")) {
      deleteTally(logId);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLog(null);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedLog(null);
    setUpdatedLog({});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLog((prev) => ({ ...prev, [name]: value }));
  };

  const saveUpdate = () => {
    updateTally(selectedLog?.id, updatedLog);
    closeUpdateModal();
  };

  const parseEvent = (event) => {
    try {
      return event ? JSON.parse(event) : {};
    } catch {
      return {};
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "Invalid timestamp";
    const date = new Date(timestamp.seconds * 1000);
    return format(date, "PPpp");
  };

  // Sort data by tournament name
  const sortedData = [...data].sort((a, b) =>
    (a.tournamentName || "").localeCompare(b.tournamentName || "")
  );

  return (
    <div className="p-4 space-y-6 bg-gray-900 text-gray-200 rounded-md shadow-md">
      <h1 className="text-xl font-bold text-center text-gray-100">
        Tally Logs
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-700 text-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Tournament Name</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-center">Rank</th>
              <th className="px-4 py-2 text-center">Timestamp</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-2">{log.tournamentName || "N/A"}</td>
                <td className="px-4 py-2">{log.name || "N/A"}</td>
                <td className="px-4 py-2 text-center">
                  <span className="ml-2">{log.rank || "N/A"}</span>
                </td>
                <td className="px-4 py-2 text-center">
                  {formatTimestamp(log.timestamp)}
                </td>
                <td className="px-4 py-2 text-center">
                  <Dropdown
                    label="Actions"
                    inline
                    className="bg-gray-800 text-white"
                  >
                    <Dropdown.Item
                      className="text-white"
                      onClick={() => handleViewDetails(log)}
                    >
                      View Details
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white"
                      onClick={() => handleUpdate(log)}
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white"
                      onClick={() => handleDelete(log.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedLog && (
        <Modal show={showModal} onClose={closeModal}>
          <Modal.Header className="bg-gray-800 text-white">
            <h1 className="text-white">Logs Details</h1>
          </Modal.Header>
          <Modal.Body className="bg-gray-900 text-gray-200">
            <div className="space-y-4">
              <p>
                <strong>Tournament Name:</strong>{" "}
                {selectedLog.tournamentName || "N/A"}
              </p>
              <p>
                <strong>Participant:</strong> {selectedLog.name || "N/A"}
              </p>
              <p>
                <strong>Rank:</strong> {selectedLog.rank || "N/A"}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {formatTimestamp(selectedLog.timestamp)}
              </p>
              <p>
                <strong>Event Details:</strong>
                <pre className="bg-gray-800 text-gray-300 p-2 rounded-md mt-2">
                  {JSON.stringify(parseEvent(selectedLog.event), null, 2)}
                </pre>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-800 text-gray-200">
            <Button
              size="sm"
              onClick={closeModal}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showUpdateModal && (
        <Modal show={showUpdateModal} onClose={closeUpdateModal}>
          <Modal.Header className="bg-gray-800 text-white">
            <h1 className="text-white">Update Log</h1>
          </Modal.Header>
          <Modal.Body className="bg-gray-900 text-gray-200">
            <div className="space-y-4">
              <TextInput
                label="Tournament Name"
                name="tournamentName"
                value={updatedLog.tournamentName || ""}
                onChange={handleUpdateChange}
                className="bg-gray-800 text-white"
              />
              <TextInput
                label="Participant Name"
                name="name"
                value={updatedLog.name || ""}
                onChange={handleUpdateChange}
                className="bg-gray-800 text-white"
              />
              <TextInput
                label="Rank"
                name="rank"
                type="number"
                value={updatedLog.rank || ""}
                onChange={handleUpdateChange}
                className="bg-gray-800 text-white"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-800 text-gray-200">
            <Button
              size="sm"
              onClick={saveUpdate}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Save Changes
            </Button>
            <Button
              size="sm"
              onClick={closeUpdateModal}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
