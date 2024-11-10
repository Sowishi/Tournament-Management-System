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
import moment from "moment";
import DefaultLayout from "../layout/defaultLayout";
import { FaTrophy } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbTournament } from "react-icons/tb";
import RankingTable from "../components/rankingTable";
import { HiCalendar } from "react-icons/hi";
import { motion } from "framer-motion";
import { Calendar, momentLocalizer } from "react-big-calendar";

const ViewTournament = () => {
  const localizer = momentLocalizer(moment);

  const { id } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const client = queryParams.get("client");

  const { getParticipants, addParticipant, deleteParticipant } =
    useCrudParticipants();
  const { showTournament, startTournament, finalizeTournament } =
    useCrudTournament();
  const { getMatches } = useCrudMatches();

  const { data: users } = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [tournament, setTournament] = useState();
  const [page, setPage] = useState("tournament");

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

  const handleFinalizeTournament = async () => {
    const output = await finalizeTournament(id);
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

  if (client) {
    return (
      <DefaultLayout client={client}>
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
              <Button onClick={() => navigation("/events")} className="mr-5">
                Back
              </Button>
              <h1 className="text-white text-3xl font-bold ">
                {tournament?.name}
              </h1>
              <Badge size={"lg"} className="ml-5">
                {tournament?.tournament_type}
              </Badge>
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
                    Provinical Meetds
                  </h1>
                </Table.Cell>
                <Table.Cell className="text-center">
                  <h1 className="text-lg text-white">
                    {moment(tournament?.start_at).format("LL")}
                  </h1>
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
        </div>
      </DefaultLayout>
    );
  }

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
          event={tournament?.description}
          setSelectedUsers={setSelectedUsers}
          users={users}
        />
      </TmsModal>
      <div className="flex">
        <div className="basis-1/12 flex justify-start items-center flex-col py-20  bg-slate-800">
          <div
            onClick={() => setPage("tournament")}
            className={`flex flex-col justify-center items-center my-5 p-3 rounded-lg cursor-pointer ${
              page == "tournament" ? "bg-slate-500" : ""
            }`}
          >
            <FaTrophy color="white" size={35} />
            <h1 className="text-white">Tournament</h1>
          </div>
          <div
            onClick={() => setPage("ranking")}
            className={`flex flex-col justify-center items-center my-5 p-3 rounded-lg cursor-pointer ${
              page == "ranking" ? "bg-slate-500" : ""
            }`}
          >
            <GiStairs color="white" size={35} />
            <h1 className="text-white">Ranking</h1>
          </div>
          <div
            onClick={() => setPage("participants")}
            className={`flex flex-col justify-center items-center my-5 p-3 rounded-lg cursor-pointer ${
              page == "participants" ? "bg-slate-500" : ""
            }`}
          >
            <BsFillPeopleFill color="white" size={35} />
            <h1 className="text-white">Participants</h1>
          </div>
          <div
            onClick={() => setPage("matches")}
            className={`flex flex-col justify-center items-center my-5 p-3 rounded-lg cursor-pointer ${
              page == "matches" ? "bg-slate-500" : ""
            }`}
          >
            <TbTournament color="white" size={35} />
            <h1 className="text-white">Matches</h1>
          </div>
          <div
            onClick={() => setPage("schedule")}
            className={`flex flex-col justify-center items-center my-5 p-3 rounded-lg cursor-pointer ${
              page == "schedule" ? "bg-slate-500" : ""
            }`}
          >
            <HiCalendar color="white" size={35} />
            <h1 className="text-white">Schedule</h1>
          </div>
        </div>
        <div className="basis-11/12 p-10">
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
                {tournament?.state == "pending" && (
                  <Tooltip content="Add Participants in the tournament">
                    <Button
                      disabled={tournament?.state == "underway"}
                      onClick={() => {
                        setAddModal(true);
                      }}
                    >
                      Add Participants
                    </Button>
                  </Tooltip>
                )}

                {tournament?.state == "pending" && (
                  <Tooltip content="Start the tournament">
                    <Button
                      color={"success"}
                      className="ml-5"
                      onClick={handleStartTournament}
                    >
                      Start Tournament
                    </Button>
                  </Tooltip>
                )}
                {tournament?.state == "awaiting_review" && (
                  <Tooltip content="Finalize tournament">
                    <Button
                      color={"success"}
                      className="ml-5"
                      onClick={handleFinalizeTournament}
                    >
                      Finalize Tournament
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>
            {page == "tournament" && (
              <>
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
                          {tournament?.description}
                        </h1>
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        <h1 className="text-lg text-white">
                          {moment(tournament?.start_at).format("LL")}
                        </h1>
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
              </>
            )}

            {page == "matches" && (
              <>
                {matches.length >= 1 && (
                  <div className="matches my-20">
                    <div className="wrapper flex items-center my-5">
                      <h1 className="text-white text-3xl font-bold">
                        Tournament Matches
                      </h1>
                      <Badge className="ml-3">{matches.length}</Badge>
                    </div>
                    <div className="flex justify-start items-start flex-wrap">
                      {matches.map((item, index) => {
                        const { match } = item;

                        return (
                          <div className="basis-4/12" key={index}>
                            <motion.div
                              key={match.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <MatchCard id={id} match={match} />
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {page == "participants" && (
              <>
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
                      removeRanking={true}
                      tournament={tournament}
                      handleDeleteParticipant={handleDeleteParticipant}
                      participants={participants}
                    />
                  )}
                </div>
              </>
            )}
            {page == "ranking" && (
              <>
                <div className="participants my-20">
                  <div className="wrapper flex items-center my-5">
                    <h1 className="text-white text-3xl font-bold">
                      Tournament Ranking
                    </h1>
                    <Badge className="ml-3">{participants.length}</Badge>
                  </div>
                  {participants.length <= 0 && (
                    <h1 className="text-white text-center text-3xl">
                      No Participants yet. try adding one.
                    </h1>
                  )}
                  {participants.length >= 1 && (
                    <RankingTable
                      tournament={tournament}
                      handleDeleteParticipant={handleDeleteParticipant}
                      participants={participants}
                    />
                  )}
                </div>
              </>
            )}
            {page == "schedule" && (
              <>
                <div className="wrapper flex items-center my-5">
                  <h1 className="text-white text-3xl font-bold">
                    Schedule of Tournament
                  </h1>
                </div>
                <Calendar
                  localizer={localizer}
                  views={["month", "agenda"]}
                  className="mx-5 bg-white rounded p-6"
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewTournament;
