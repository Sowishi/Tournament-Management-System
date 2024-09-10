import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import { Badge, Button, Table, Tooltip } from "flowbite-react";
import useCrudParticipants from "../hooks/useCrudParticipants";
import { useEffect, useState } from "react";
import ParticipantsTables from "../components/participantsTable";
import TmsModal from "../components/tmsModal";
import useGetUsers from "../hooks/useGetUsers";
import AddParticipantsTable from "../components/addParticipantsTable";
import { toast } from "react-toastify";
import useCrudTournament from "../hooks/useCrudTournament";
import useCrudMatches from "../hooks/useCrudMatches";
import MatchCard from "../components/matchCard";

const ViewTournament = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const { getParticipants, addParticipant, deleteParticipant } =
    useCrudParticipants();
  const { showTournament, startTournament } = useCrudTournament();
  const { getMatches } = useCrudMatches();

  const { data: users } = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [tournament, setTournament] = useState();

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

  const handleShowTournament = async () => {
    const output = await showTournament(id);
    const { tournament } = output.data;
    setTournament(tournament);
  };

  const handleStartTournament = async () => {
    const output = await startTournament(id);
    if (!output.error) {
      toast.success(output.message);
      window.location.reload();
    }
  };

  const handleGetMatches = async () => {
    const output = await getMatches(id);
    const { data } = output;
    setMatches(data);
  };

  useEffect(() => {
    handleGetParticipants();
    handleShowTournament();
    handleGetMatches();
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
              {tournament?.name}
            </h1>
            <Badge size={"lg"} className="ml-5">
              {tournament?.tournament_type}
            </Badge>
          </div>
          <div className="wrapper flex items-center justify-center">
            <Tooltip content="Add Participants in the tournament">
              <Button
                onClick={() => {
                  setAddModal(true);
                }}
              >
                Add Participants
              </Button>
            </Tooltip>

            <Tooltip content="Start the tournament">
              <Button
                disabled={tournament?.state !== "pending"}
                color={"success"}
                className="ml-5"
                onClick={handleStartTournament}
              >
                Start Tournament
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="mb-5">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="text-center bg-slate-900 text-white font-bold border">
                Tournament State
              </Table.HeadCell>
              <Table.HeadCell className="text-center bg-slate-900 text-white font-bold border">
                Registered Event
              </Table.HeadCell>
              <Table.HeadCell className="text-center bg-slate-900 text-white font-bold border">
                Tournament Start Date
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Cell className="text-center flex items-center justify-center">
                <Badge color={"warning"} size={"lg"} className="px-10">
                  <h1 className="text-lg"> {tournament?.state}</h1>
                </Badge>
              </Table.Cell>
              <Table.Cell className="text-center">
                <h1 className="text-lg text-white">
                  {" "}
                  {/* {tournament?.description} */}
                  Provinical Meet
                </h1>
              </Table.Cell>
              <Table.Cell className="text-center">
                <h1 className="text-lg text-white">Aug 28, 2024</h1>
              </Table.Cell>
            </Table.Body>
          </Table>
        </div>
        <iframe
          src={`https://challonge.com/${id}/module`}
          width="100%"
          height="500"
          frameborder="0"
          scrolling="auto"
          allowtransparency="true"
        ></iframe>
        {matches.length >= 1 && (
          <div className="matches my-20">
            <div className="wrapper flex items-center my-5">
              <h1 className="text-white text-3xl font-bold">
                Tournament Matches
              </h1>
              <Badge className="ml-3">{matches.length}</Badge>
            </div>
            <div className="flex flex-wrap">
              {matches.map((item) => {
                const { match } = item;

                return <MatchCard id={id} key={match.id} match={match} />;
              })}
            </div>
          </div>
        )}

        <div className="participants my-20">
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
