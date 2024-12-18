"use client";

import { Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddParticipantsTable({
  users,
  setSelectedUsers,
  event,
}) {
  const [tournaInfo, setTournaInfo] = useState(null);

  useEffect(() => {
    if (event) {
      try {
        // Attempt to parse the description as JSON
        const parsedData = JSON.parse(event);
        setTournaInfo(parsedData);
      } catch (error) {
        // If parsing fails, set the description as is
        setTournaInfo(event);
      }
    }
  }, [event]);

  const handleCheckboxChange = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, user]); // Add user if checked
    } else {
      setSelectedUsers((prev) => prev.filter((u) => u !== user)); // Remove user if unchecked
    }
  };

  const filterUsers = users.filter((user) => {
    if (
      user.sportsEvent === tournaInfo?.eventName &&
      user?.userType !== "admin" &&
      user.status == "Approved"
    ) {
      return user;
    }
  });

  console.log(event);
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4"></Table.HeadCell>
          <Table.HeadCell>School/College</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filterUsers?.map((item) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox
                    onChange={(event) => {
                      handleCheckboxChange(item, event.target.checked);
                    }}
                  />
                </Table.Cell>

                <Table.Cell>{item.collegeName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
