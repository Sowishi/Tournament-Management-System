"use client";

import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useGetUsers from "../hooks/useGetUsers";
import useUpdateUser from "../hooks/useUpdateUser";
import useGetEventName from "../hooks/useGetEventName";
import { useState } from "react";
import TmsModal from "./tmsModal";
import { useStore } from "../zustand/store";
import ConfirmationModals from "./confirmationModal";
import { toast } from "react-toastify";

export function UsersTable() {
  const { data } = useGetUsers();
  const { data: eventNames } = useGetEventName();
  const { approveUser, rejectUser, deleteUser, documents } = useUpdateUser();
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [documentModal, setDocumentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const { currentUser } = useStore();
  const [deleteModal, setDeleteModal] = useState(false);

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
    if (selectedEvent == "all" && item.userType !== "admin") {
      return item;
    }
    if (item.sportsEvent == selectedEvent && item.userType !== "admin") {
      return item;
    }
  });

  const documentsFilter = documents.filter((doc) => {
    if (doc.owner == selectedUser) {
      return doc;
    }
  });

  return (
    <div className="overflow-x-auto mt-10">
      <TmsModal
        size="5xl"
        title={"Documents"}
        openModal={documentModal}
        handleClose={() => {
          setDocumentModal(false);
          setSelectedUser(null);
        }}
      >
        <div className="flex flex-wrap m-5">
          {documentsFilter?.map((item) => {
            return (
              <div
                key={item.id}
                className="wrapper basis-4/12 flex items-center justify-center flex-col"
              >
                <iframe src={item.file} />

                <div className="wrapper flex items-center justify-center">
                  <h1 className="text-dark font-bold my-5">{item.fileLabel}</h1>
                  <Button className="ml-3">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {documentsFilter.length <= 0 && (
          <>
            <h1 className="text-dark text-center font-bold my-5">
              No Documents Provided
            </h1>
          </>
        )}
      </TmsModal>

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

      <ConfirmationModals
        title={"Are you sure to delete this user?"}
        handleSubmit={() => {
          deleteUser(selectedUser);
          setDeleteModal(false);
          toast.success("Successfully Deleted User");
        }}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />
      <Table>
        <Table.Head className="bg-slate-800">
          <Table.HeadCell className="bg-slate-800 text-white">
            SUCs Representative
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            College Name
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Sports Events
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white">
            Email
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
                <Table.Cell className="font-bold">
                  {user.schoolRepresentative}
                </Table.Cell>
                <Table.Cell className="font-bold">
                  {user.collegeName}
                </Table.Cell>
                <Table.Cell className="font-bold">
                  {user.sportsEvent}
                </Table.Cell>
                <Table.Cell className="font-bold">{user.email}</Table.Cell>
                <Table.Cell className="font-bold">
                  <Badge
                    color={getBadgeColor(user.status ? user.status : "Pending")}
                  >
                    {user.status ? user.status : "Pending"}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-bold">
                  <Dropdown label="Action" placement="left">
                    <Dropdown.Item
                      onClick={() => {
                        setDocumentModal(true);
                        setSelectedUser(user.id);
                      }}
                    >
                      View Documetns
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => approveUser(user.id)}>
                      Accept User
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => rejectUser(user.id)}>
                      Reject User
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedUser(user.id);
                      }}
                    >
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
