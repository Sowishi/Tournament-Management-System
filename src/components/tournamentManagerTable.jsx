"use client";

import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useGetUsers from "../hooks/useGetUsers";
import useUpdateUser from "../hooks/useUpdateUser";
import useCrudAdmin from "../hooks/useCrudAdmin";
import ConfirmationModals from "./confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";

export function TournamentManagerTable({ handleUpdateForms, data }) {
  const { deleteAdmin } = useCrudAdmin();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState();

  console.log(data);

  return (
    <div className="overflow-x-auto mt-10">
      <ConfirmationModals
        title={"Are you sure to delete this admin?"}
        handleSubmit={() => {
          deleteAdmin({ id: selectedAdmin });
          setDeleteModal(false);
          toast.success("Successfully Deleted Admin");
        }}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />
      <Table>
        <Table.Head className="bg-slate-800">
          <Table.HeadCell className="bg-slate-800 text-white">
            Full Name
          </Table.HeadCell>

          <Table.HeadCell className="bg-slate-800 text-white">
            Email
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Password
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Role
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Assigned Tournament
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
                <Table.Cell className="font-bold">{user.email}</Table.Cell>
                <Table.Cell className="font-bold">{user.password}</Table.Cell>
                <Table.Cell className="font-bold">{user.role}</Table.Cell>
                <Table.Cell className="font-bold">
                  {user.assignTournament}
                </Table.Cell>

                <Table.Cell className="font-bold">
                  <div className="wrappe flex">
                    <Button onClick={() => handleUpdateForms(user)}>
                      Update
                    </Button>{" "}
                    <Button
                      onClick={() => {
                        setSelectedAdmin(user.id);
                        setDeleteModal(true);
                      }}
                      color={"failure"}
                      className="mx-3"
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
