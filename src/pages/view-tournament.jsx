import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import { Badge, Button } from "flowbite-react";
import useCrudParticipants from "../hooks/useCrudParticipants";
import { useEffect, useState } from "react";
import ParticipantsTables from "../components/participantsTable";
import TmsModal from "../components/tmsModal";
import useGetUsers from "../hooks/useGetUsers";
import AddParticipantsTable from "../components/addParticipantsTable";
import { toast } from "react-toastify";

const ViewTournament = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { getParticipants, addParticipant, deleteParticipant } =
    useCrudParticipants();
  const tournament = {
    name: queryParams.get("name"),
    date: queryParams.get("date"),
    tournament_type: queryParams.get("tournament_type"),
    description: queryParams.get("description"),
    participants_count: queryParams.get("participants_count"),
  };
  const { data: users } = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [participants, setParticipants] = useState([]);
  const [addModal, setAddModal] = useState(false);

  const handleGetParticipants = async () => {
    const output = await getParticipants(id);
    setParticipants(output.data);
  };

  const handleAddParticpant = async () => {
    const output = await addParticipant(selectedUsers, id);
    if (!output.error) {
      toast.success(output.message);
      setAddModal(false);
      window.location.reload();
    }
  };

  const handleDeleteParticipant = async (userID) => {
    const output = await deleteParticipant(id, userID);
    if (!output.error) {
      toast.success(output.message);
      window.location.reload();
    }
  };

  useEffect(() => {
    handleGetParticipants();
  }, []);

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleAddParticpant}
        title={"Add Participant"}
        size={"5xl"}
        openModal={addModal}
        handleClose={() => setAddModal(false)}
      >
        <AddParticipantsTable
          setSelectedUsers={setSelectedUsers}
          users={users}
        />
      </TmsModal>
      <div className="container mx-auto mt-10 pb-20">
        <div className="wrapper flex items-center justify-between mb-5">
          <div className="wrapper flex items-center">
            <Button
              onClick={() => navigation("/admin/tournament")}
              className="mr-5"
            >
              Back
            </Button>
            <h1 className="text-white text-3xl font-bold ">
              {tournament.name}
            </h1>
            <Badge size={"lg"} className="ml-5">
              {tournament.tournament_type}
            </Badge>
          </div>
          <Button
            onClick={() => {
              setAddModal(true);
            }}
          >
            Add Participants
          </Button>
        </div>
        <iframe
          src={`https://challonge.com/${id}/module`}
          width="100%"
          height="500"
          frameborder="0"
          scrolling="auto"
          allowtransparency="true"
        ></iframe>
        <div className="participants">
          <div className="wrapper flex items-center my-5">
            <h1 className="text-white text-3xl font-bold">
              Tournament Participants
            </h1>
            <Badge className="ml-3">{participants.length}</Badge>
          </div>
          {participants.length <= 0 && (
            <h1 className="text-white text-center text-3xl">
              No Participants yet. try adding one.
            </h1>
          )}
          {participants.length >= 1 && (
            <ParticipantsTables
              handleDeleteParticipant={handleDeleteParticipant}
              participants={participants}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewTournament;
