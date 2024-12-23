"use client";

import { Checkbox, Table, Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { MdSportsSoccer } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import moment from "moment";
import useUpdateUser from "../hooks/useUpdateUser";

export default function AddParticipantsTable({
  users,
  setSelectedUsers,
  event,
  race,
}) {
  const [tournaInfo, setTournaInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [playerCoaches, setPlayerCoaches] = useState([]);
  const [playersCount, setPlayersCount] = useState({}); // Object to store player counts per user
  const { getPlayerCoaches } = useUpdateUser();

  useEffect(() => {
    if (event) {
      try {
        const parsedData = JSON.parse(event);
        setTournaInfo(parsedData);
      } catch (error) {
        setTournaInfo(event);
      }
    }
  }, [event]);

  useEffect(() => {
    if (selectedPlayers?.id) {
      getPlayerCoaches(selectedPlayers.id, setPlayerCoaches);
    }
  }, [selectedPlayers]);

  const handleCheckboxChange = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, user]);
      getPlayerCoaches(user.id, (coaches) => {
        const players = coaches.filter((coach) => coach.role === "Player");
        setPlayersCount((prev) => ({ ...prev, [user.id]: players.length }));
      });
    } else {
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
      setPlayersCount((prev) => {
        const updatedCounts = { ...prev };
        delete updatedCounts[user.id];
        return updatedCounts;
      });
    }
  };

  const filterUsers = users.filter(
    (user) =>
      user.sportsEvent === tournaInfo?.eventName &&
      user?.userType !== "admin" &&
      user.status === "Approved"
  );

  const filterUsersRace = users.filter(
    (user) =>
      user.sportsEvent === event &&
      user?.userType !== "admin" &&
      user.status === "Approved"
  );

  const handleViewPlayers = (players) => {
    setSelectedPlayers(players);
    setIsModalOpen(true);
  };

  const players = playerCoaches.filter((user) => user.role === "Player");

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4"></Table.HeadCell>
          <Table.HeadCell>
            <AiOutlineUser className="inline-block mr-2" />
            School/College
          </Table.HeadCell>
          <Table.HeadCell>
            <AiOutlineMail className="inline-block mr-2" />
            Email
          </Table.HeadCell>
          <Table.HeadCell>
            <MdSportsSoccer className="inline-block mr-2" />
            Registered Event
          </Table.HeadCell>
          <Table.HeadCell>
            <FiUsers className="inline-block mr-2" />
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {(!race ? filterUsers : filterUsersRace)?.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="p-4">
                <Checkbox
                  onChange={(event) =>
                    handleCheckboxChange(item, event.target.checked)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                {item.collegeName}
                {playersCount[item.id] > 0 && (
                  <span className="block text-sm text-green-500">
                    this delegate has {playersCount[item.id]} player(s)
                  </span>
                )}
                {playersCount[item.id] <= 0 && (
                  <span className="block text-sm text-red-500">
                    There's no player(s) on this delegate
                  </span>
                )}
              </Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.sportsEvent}</Table.Cell>
              <Table.Cell>
                <Button size="xs" onClick={() => handleViewPlayers(item)}>
                  View Players
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          {(!race && filterUsers.length === 0) ||
          (race && filterUsersRace.length === 0) ? (
            <Table.Row>
              <Table.Cell colSpan="5" className="text-center py-4">
                <p className="text-gray-500 italic">No participants found.</p>
              </Table.Cell>
            </Table.Row>
          ) : null}
        </Table.Body>
      </Table>

      {/* Modal to view players */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="4xl"
      >
        <Modal.Header>Players</Modal.Header>
        <Modal.Body>
          {players.length > 0 ? (
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    Full Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Sports</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {user.fullName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.selectedSport + " " + user.selectedCategory ||
                        "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.selectedGender || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {moment(user.createdAt?.toDate()).format("LLL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 italic">
                No players are currently available.
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
