import { Button } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import TmsModal from "./tmsModal";
import TmsInput from "./tmsInput";
import TmsSelect from "./tmsSelect";
import SportsSelection from "./sportSelection";
import useUpdateUser from "../hooks/useUpdateUser";

const PlayerCoachComponent = ({
  playerCoaches,
  handleAddUser,
  updatePlayerCoach,
  newUser,
  setNewUser,
  deletePlayerCoach,
  currentUser,
}) => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false); // Confirmation modal state
  const [confirmationDetails, setConfirmationDetails] = useState({}); // Details for the action

  const { updatePlayerCoaches } = useUpdateUser();

  const openEditModal = (user) => {
    setEditingUser(user);
    setSelectedSport(user.selectedSport || "");
    setSelectedCategory(user.selectedCategory || "");
    setSelectedGender(user.selectedGender || "");
    setEditUserModal(true);
  };

  const confirmAction = (actionType, user) => {
    setConfirmationDetails({ actionType, user });
    setConfirmationModal(true);
  };

  const handleConfirmAction = () => {
    const { actionType, user } = confirmationDetails;

    if (actionType === "delete") {
      deletePlayerCoach(currentUser.id, user.id);
    } else if (actionType === "update") {
      updatePlayerCoaches(
        {
          ...editingUser,
          selectedSport,
          selectedGender,
          selectedCategory,
        },
        currentUser.id
      );
    }
    setConfirmationModal(false);
    setEditUserModal(false);
  };

  return (
    <div className="wrapper my-10">
      {/* Add Player/Coach Modal */}
      <TmsModal
        title={"Add Player/Coach"}
        openModal={addUserModal}
        handleClose={() => setAddUserModal(false)}
        onSubmit={() => {
          handleAddUser({
            ...newUser,
            selectedSport,
            selectedGender,
            selectedCategory,
          });
          setAddUserModal(false);
        }}
      >
        <div className="container">
          <TmsSelect
            name="role"
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            label="Role"
            data={["Please select role", "Player", "Coach"]}
            dark
          />
          {newUser.role === "Coach" && (
            <TmsInput
              dark={true}
              name="email"
              placeHolder="Email"
              label="Email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          )}
          <TmsInput
            dark={true}
            name="fullName"
            placeHolder="Full Name"
            label="Full Name"
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />
          <SportsSelection
            setSelectedCategory={setSelectedCategory}
            setSelectedSport={setSelectedSport}
            setSelectedGender={setSelectedGender}
            selectedCategory={selectedCategory}
            selectedGender={selectedGender}
            selectedSport={selectedSport}
          />
        </div>
      </TmsModal>

      {/* Edit Player/Coach Modal */}
      {editingUser && (
        <TmsModal
          title={"Edit Player/Coach"}
          openModal={editUserModal}
          handleClose={() => setEditUserModal(false)}
          onSubmit={() => confirmAction("update", editingUser)}
        >
          <div className="container">
            <TmsSelect
              name="role"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              label="Role"
              data={["Please select role", "Player", "Coach"]}
              dark
            />
            {editingUser.role === "Coach" && (
              <TmsInput
                dark={true}
                name="email"
                placeHolder="Email"
                label="Email"
                value={editingUser.email || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            )}
            <TmsInput
              dark={true}
              name="fullName"
              placeHolder="Full Name"
              label="Full Name"
              value={editingUser.fullName}
              onChange={(e) =>
                setEditingUser({ ...editingUser, fullName: e.target.value })
              }
            />
            <SportsSelection
              setSelectedCategory={setSelectedCategory}
              setSelectedSport={setSelectedSport}
              setSelectedGender={setSelectedGender}
              selectedCategory={selectedCategory}
              selectedGender={selectedGender}
              selectedSport={selectedSport}
            />
          </div>
        </TmsModal>
      )}

      {/* Confirmation Modal */}
      <TmsModal
        title="Confirmation"
        openModal={confirmationModal}
        handleClose={() => setConfirmationModal(false)}
        onSubmit={handleConfirmAction}
      >
        <p>
          Are you sure you want to{" "}
          {confirmationDetails.actionType === "delete" ? "delete" : "update"}{" "}
          this user?
        </p>
      </TmsModal>

      {/* Add Button */}
      <div className="flex justify-end mb-5">
        <Button onClick={() => setAddUserModal(true)}>Add Player/Coach</Button>
      </div>

      {/* Player/Coach Table */}
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Sports</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {playerCoaches?.map((user, index) => {
            const date = moment(user.createdAt?.toDate()).format("LLL");

            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {user.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.selectedSport + " " + user.selectedCategory || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.selectedGender || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      color="warning"
                      className="px-3"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => confirmAction("delete", user)}
                    >
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerCoachComponent;
