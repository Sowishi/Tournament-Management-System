"use client";

import { Checkbox, Table } from "flowbite-react";

export default function AddParticipantsTable({
  users,
  setSelectedUsers,
  event,
}) {
  const handleCheckboxChange = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, user]); // Add user if checked
    } else {
      setSelectedUsers((prev) => prev.filter((u) => u !== user)); // Remove user if unchecked
    }
  };

  const filterUsers = users.filter((user) => {
    if (user.sportsInfo == event) {
      return user;
    }
  });
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4"></Table.HeadCell>
          <Table.HeadCell>School/College</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>

          <Table.HeadCell>Event Registered</Table.HeadCell>
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

                <Table.Cell>{item.sportsInfo}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
