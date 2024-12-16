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
import MatchDateCard from "../components/matchDateCard";
import { useStore } from "../zustand/store";
import MatchCardReport from "../components/matchCardReport";
import ParticipantsTablesReport from "../components/participantsTableReport";
import RankingTableReports from "../components/rankingTableReport";
import { data } from "autoprefixer";

const ViewReports = () => {
  const localizer = momentLocalizer(moment);
  const { currentAdmin } = useStore();

  const { id } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const client = queryParams.get("client");

  const { getParticipants, addParticipant, deleteParticipant } =
    useCrudParticipants();
  const { showTournament, startTournament, finalizeTournament } =
    useCrudTournament();
  const { getMatches, updateMatchDate, getMatchDates } = useCrudMatches();

  const { data: users } = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [tournament, setTournament] = useState();
  const [page, setPage] = useState("tournament");
  const [matchDates, setMatchDates] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [tournaInfo, setTournaInfo] = useState(null);

  useEffect(() => {
    if (tournament?.description) {
      try {
        // Attempt to parse the description as JSON
        const parsedData = JSON.parse(tournament?.description);
        setTournaInfo(parsedData);
      } catch (error) {
        // If parsing fails, set the description as is
        setTournaInfo(tournament?.description);
      }
    }
  }, [tournament]);

  const handleGetParticipants = async () => {
    const output = await getParticipants(id);
    setParticipants(output.data);
  };

  const handleAddParticpant = async () => {
    const output = await addParticipant(selectedUsers, id, tournament?.name);
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
    setLoading(true);
    const output = await showTournament(id);
    setLoading(false);

    const { tournament } = output.data;
    setTournament(tournament);
  };

  const handleFinalizeTournament = async () => {
    const output = await finalizeTournament(id);
    if (!output.error) {
      toast.success(output.message);
      // window.location.reload();
    }
  };

  const handleGetMatches = async () => {
    const output = await getMatches(id);
    const { data } = output;
    setMatches(data);
  };

  const handleGetParticipantsRanking = async () => {
    const output = await getParticipants(id);
    return output;
  };

  useEffect(() => {
    handleGetParticipants();
    handleShowTournament();
    handleGetMatches();
    getMatchDates(id, setMatchDates);
  }, []);

  const tournamentID = id;

  const tournamentManger = users.find((user) => {
    if (tournament?.name == user.assignTournament) {
      return user;
    }
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="container p-20 flex justify-center items-center mx-auto">
          <h1 className="text-white text-4xl">Loading....</h1>
        </div>
      </AdminLayout>
    );
  }
  if (!tournament) {
    return (
      <AdminLayout>
        <div className="container p-20 flex justify-center items-center mx-auto">
          <h1 className="text-white text-4xl">
            Sorry, the tournament has either expired or deleted
          </h1>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="flex items-start justify-start ">
        <div className="basis-full p-10">
          <div className="container mx-auto mt-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-between mb-5">
              {/* Header */}
              <div className="wrapper mb-5 flex items-center justify-between  w-full ">
                <div className="flex justify-center items-center">
                  <Button
                    onClick={() => navigation("/admin/reports")}
                    className="mr-5"
                  >
                    Back
                  </Button>
                  <h1 className="text-white text-sm md:text-3xl font-bold ">
                    {tournament?.name}
                  </h1>
                  <Badge size={"lg"} className="ml-5 text-center">
                    <span className="text-xs md:text-lg text-center">
                      {" "}
                      {tournament?.tournament_type}
                    </span>
                  </Badge>
                </div>
                <Button color={"success"} className="mr-5">
                  Generate Tournament Reports
                </Button>
              </div>
            </div>
            <>
              <div className="mb-5 hidden md:block">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell className="text-center text-xs bg-slate-900 text-white font-bold border">
                      Tournament State
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-xs bg-slate-900 text-white font-bold border">
                      Registered Event
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-xs bg-slate-900 text-white font-bold border">
                      Category
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-xs bg-slate-900 text-white font-bold border">
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
                        {tournaInfo?.eventName}
                      </h1>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex flex-col">
                        <h1 className="text-lg text-white">
                          {tournaInfo?.selectedSport}{" "}
                          {tournaInfo?.selectedCategory ? " | " : ""}
                          {tournaInfo?.selectedCategory}
                        </h1>
                        <h1 className="text-lg text-white">
                          {tournaInfo?.selectedGender}
                        </h1>{" "}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <h1 className="text-lg text-white">
                        {tournament?.started_at
                          ? moment(tournament?.started_at).format("LLL")
                          : "Waiting to start"}
                      </h1>
                    </Table.Cell>
                  </Table.Body>
                </Table>
              </div>
            </>

            {/* Mathces Data */}
            <div className="flex flex-col items-center justify-center my-20">
              <h1 className="text-white text-sm md:text-5xl text-center font-bold mb-5">
                Tournament Name: {tournament?.name}
              </h1>
              <h1 className="text-white text-2xl">
                {tournament?.tournament_type}
              </h1>
            </div>
            {matches.length >= 1 && (
              <div className="matches my-20">
                <div className="wrapper flex items-center my-5">
                  <h1 className="text-white text-3xl font-bold">
                    Tournament Matches
                  </h1>
                  <Badge className="ml-3">{matches.length}</Badge>
                </div>
                <div className="flex justify-center items-center flex-wrap">
                  {matches.map((item, index) => {
                    const { match } = item;

                    return (
                      <div className="basis-5/12 mx-3" key={index}>
                        <motion.div
                          key={match.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <MatchCardReport
                            id={id}
                            match={match}
                            tournament={tournament}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                  <RankingTableReports
                    handleFinalizeTournament={handleFinalizeTournament}
                    handleGetParticipants={handleGetParticipantsRanking}
                    tournamentState={tournament?.state}
                    tournament={tournament}
                    handleDeleteParticipant={handleDeleteParticipant}
                    participants={participants}
                  />
                )}
              </div>
            </>
            <>
              <div className="wrapper flex items-center my-5">
                <h1 className="text-white text-3xl font-bold">
                  Schedule of Tournament
                </h1>
              </div>
              <Calendar
                events={matchDates}
                localizer={localizer}
                views={["month", "agenda"]}
                className="mx-5 bg-white rounded p-6"
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: "100%" }}
              />
            </>
            <div className="mt-20 flex flex-col items-center">
              <p className="text-white text-4xl font-bold mt-2">
                {tournamentManger?.fullName
                  ? tournamentManger.fullName
                  : "No Tournament Manager Yet."}
              </p>
              <h2 className="text-white text-lg font-semibold">
                Tournament Manager
              </h2>
              <h1 className="text-white mt-10">
                ______________________________
              </h1>
              <h1 className="text-white">Signature</h1>
              <div className="mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-20 h-10 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 20l8-8m0 0l8 8m-8-8v16"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewReports;
