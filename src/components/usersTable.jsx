"use client";

import { Badge, Dropdown, Table } from "flowbite-react";
import useGetUsers from "../hooks/useGetUsers";
import useUpdateUser from "../hooks/useUpdateUser";

export function UsersTable() {
  const { data } = useGetUsers();
  const { approveUser, rejectUser, deleteUser } = useUpdateUser();

  const getBadgeColor = (status) => {
    if (status == "Pending") {
      return "info";
    } else if (status == "Approve") {
      return "success";
    } else {
      return "failure";
    }
  };

  return (
    <div className="overflow-x-auto mt-10">
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
            Status
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((user) => {
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
