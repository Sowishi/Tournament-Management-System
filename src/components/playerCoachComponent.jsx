import { Button } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import TmsModal from "./tmsModal";
import TmsInput from "./tmsInput";
import TmsSelect from "./tmsSelect";
import SportsSelection from "./sportSelection";

const PlayerCoachComponent = ({
  playerCoaches,
  handleAddUser,
  newUser,
  setNewUser,
  deletePlayerCoach,
  currentUser,
}) => {
  const [addUserModal, setAddUserModal] = useState(false); // Tracks if the modal is open or closed
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  console.log(playerCoaches);
  return (
    <div className="wrapper my-10">
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
        }} // Calls the function when the form is submitted
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

      <div className="flex justify-end mb-5">
        <Button onClick={() => setAddUserModal(true)}>Add Player/Coach</Button>
      </div>

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
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => deletePlayerCoach(currentUser.id, user.id)}
                  >
                    Remove
                  </Button>
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
