import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { ListGroup, Modal, Button } from "flowbite-react";
import useGetUsers from "../hooks/useGetUsers";
import { useStore } from "../zustand/store";
import { useState } from "react";

const Participants = () => {
  const { data } = useGetUsers();
  const { currentEvent } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const filterData = data.filter((user) => {
    return user.status === "Approve" && user.sportsEvent === currentEvent;
  });

  // Function to open modal and set selected participant
  const handleOpenModal = (participant) => {
    setSelectedParticipant(participant);
    setIsOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedParticipant(null);
  };

  return (
    <DefaultLayout>
      <Title title="Events Participants" />
      <div className="container mx-auto p-5">
        <div className="flex justify-center items-center pb-20">
          <ListGroup className="w-full">
            {filterData?.map((item) => (
              <ListGroup.Item
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className="cursor-pointer"
              >
                <div className="wrapper flex justify-between items-center w-full">
                  <h1 className="text-3xl">{item.collegeName}</h1>
                  <img
                    src={item.collegeLogoURL}
                    style={{ width: "50px" }}
                    alt={item.collegeName} // Added alt text for accessibility
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>

      {/* Modal for displaying participant details */}
      <Modal size={"4xl"} show={isOpen} onClose={handleCloseModal}>
        <Modal.Header>
          {selectedParticipant
            ? selectedParticipant.collegeName
            : "Participant Details"}
        </Modal.Header>
        <Modal.Body>
          {selectedParticipant && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">College Name</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {selectedParticipant.collegeName}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Status</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {selectedParticipant.status}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Event</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {selectedParticipant.sportsEvent}
                  </td>
                </tr>
                {/* Add more rows as necessary */}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
};

export default Participants;
