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
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getBadgeColor = (status) => {
    if (status === "Pending") {
      return "info";
    } else if (status === "Approve") {
      return "success";
    } else {
      return "failure";
    }
  };

  const filter = data.filter((item) => {
    if (selectedEvent === "all" && item.userType !== "admin") {
      return item;
    }
    if (item.sportsEvent === selectedEvent && item.userType !== "admin") {
      return item;
    }
    return null;
  });

  const documentsFilter = documents.filter((doc) => {
    return doc.owner === selectedUser;
  });

  return (
    <div className="overflow-x-auto mt-10">
      {/* Document View Modal */}
      <TmsModal
        size="7xl" // Increase size for better visibility
        title={"View Document"}
        openModal={!!selectedDocument} // Show modal if a document is selected
        handleClose={() => setSelectedDocument(null)} // Close modal
      >
        {selectedDocument ? (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">
              {selectedDocument.fileLabel}
            </h1>
            <iframe
              src={selectedDocument.file}
              title={selectedDocument.fileLabel}
              className="w-full h-screen border border-gray-300"
            />
            <div className="mt-10 w-full">
              <Button
                className="w-full py-3"
                onClick={() => setSelectedDocument(null)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <h1 className="text-dark text-center font-bold">
            No Document Selected
          </h1>
        )}
      </TmsModal>

      {/* Existing Document Modal */}
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
          {documentsFilter?.map((item) => (
            <div
              key={item.id}
              className="wrapper basis-4/12 flex items-center justify-center flex-col mb-4"
            >
              <iframe src={item.file} frameborder="0"></iframe>
              <Button onClick={() => setSelectedDocument(item)}>
                View Document
              </Button>
            </div>
          ))}
        </div>
        {documentsFilter.length <= 0 && (
          <h1 className="text-dark text-center font-bold my-5">
            No Documents Provided
          </h1>
        )}
      </TmsModal>

      <div className="wrapper flex mb-3 py-3">
        <Button
          color={selectedEvent === "all" ? "info" : "gray"}
          onClick={() => setSelectedEvent("all")}
          className="mx-3"
        >
          All
        </Button>
        {eventNames.map((event) => (
          <Button
            key={event.id}
            color={selectedEvent === event.eventName ? "info" : "gray"}
            className="mx-3"
            onClick={() => setSelectedEvent(event.eventName)}
          >
            {event.eventName}
          </Button>
        ))}
      </div>

      <ConfirmationModals
        title={"Are you sure you want to delete this user?"}
        handleSubmit={() => {
          deleteUser(selectedUser);
          setDeleteModal(false);
          toast.success("Successfully Deleted User");
        }}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <ConfirmationModals
        title={"Are you sure you want to approve this user?"}
        handleSubmit={() => {
          approveUser(selectedUser);
          setApproveModal(false);
          toast.success("Successfully Approved User");
        }}
        openModal={approveModal}
        handleClose={() => setApproveModal(false)}
      />

      <ConfirmationModals
        title={"Are you sure you want to reject this user?"}
        handleSubmit={() => {
          rejectUser(selectedUser);
          setRejectModal(false);
          toast.success("Successfully Rejected User");
        }}
        openModal={rejectModal}
        handleClose={() => setRejectModal(false)}
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
          {filter?.map((user) => (
            <Table.Row
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-bold">
                {user.schoolRepresentative}
              </Table.Cell>
              <Table.Cell className="font-bold">{user.collegeName}</Table.Cell>
              <Table.Cell className="font-bold">{user.sportsEvent}</Table.Cell>
              <Table.Cell className="font-bold">{user.email}</Table.Cell>
              <Table.Cell className="font-bold">
                <Badge color={getBadgeColor(user.status || "Pending")}>
                  {user.status || "Pending"}
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
                    View Documents
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setApproveModal(true);
                      setSelectedUser(user.id);
                    }}
                  >
                    Accept User
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setRejectModal(true);
                      setSelectedUser(user.id);
                    }}
                  >
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
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
