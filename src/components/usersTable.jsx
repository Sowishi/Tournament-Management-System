"use client";

import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useGetUsers from "../hooks/useGetUsers";
import useUpdateUser from "../hooks/useUpdateUser";
import useGetEventName from "../hooks/useGetEventName";
import { useState } from "react";

export function UsersTable() {
  const { data } = useGetUsers();
  const { data: eventNames } = useGetEventName();
  const { approveUser, rejectUser, deleteUser } = useUpdateUser();
  const [selectedEvent, setSelectedEvent] = useState("all");

  const getBadgeColor = (status) => {
    if (status == "Pending") {
      return "info";
    } else if (status == "Approve") {
      return "success";
    } else {
      return "failure";
    }
  };

  const filter = data.filter((item) => {
    if (selectedEvent == "all") {
      return item;
    }
    if (item.sportsInfo == selectedEvent) {
      return item;
    }
  });
  return (
    <div className="overflow-x-auto mt-10">
      <div className="wrapper flex mb-3 py-3">
        <Button
          color={selectedEvent == "all" ? "info" : "gray"}
          onClick={() => setSelectedEvent("all")}
          className="mx-3"
        >
          All
        </Button>
        {eventNames.map((event) => {
          return (
            <Button
              key={event.id}
              color={selectedEvent == event.eventName ? "info" : "gray"}
              className="mx-3"
              onClick={() => setSelectedEvent(event.eventName)}
            >
              {event.eventName}
            </Button>
          );
        })}
      </div>
      <Table>
        <Table.Head className="bg-slate-800">
          <Table.HeadCell className="bg-slate-800 text-white">
            Full Name
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            College Name
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Email
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Position
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Events
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filter?.map((user) => {
            return (
              <Table.Row
                key={user.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-bold">{user.fullName}</Table.Cell>
                <Table.Cell className="font-bold">
                  {user.collegeName}
                </Table.Cell>
                <Table.Cell className="font-bold">{user.email}</Table.Cell>
                <Table.Cell className="font-bold">{user.position}</Table.Cell>
                <Table.Cell className="font-bold">{user.sportsInfo}</Table.Cell>
                <Table.Cell className="font-bold">
                  <Badge
                    color={getBadgeColor(user.status ? user.status : "Pending")}
                  >
                    {user.status ? user.status : "Pending"}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-bold">
                  <Dropdown label="Action" placement="left">
                    <Dropdown.Item onClick={() => approveUser(user.id)}>
                      Accept User
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => rejectUser(user.id)}>
                      Reject User
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteUser(user.id)}>
                      Delete User
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
