import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../layout/defaultLayout";
import AdminLayout from "../layout/adminLayout";

import { Badge, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import useCrudRace from "../hooks/useCrudRace";
import TmsModal from "../components/tmsModal";
import AddParticipantsTable from "../components/addParticipantsTable";
import useGetUsers from "../hooks/useGetUsers";
import { toast } from "react-toastify";
import RaceTableParticipants from "../components/raceTableParticipants";
import RaceMatchTable from "../components/raceMatchTable";
import RaceRankingTable from "../components/raceRankingTable";

const ViewTimeTrial = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);

  const client = queryParams.get("client");

  const navigation = useNavigate();
  const [race, setRace] = useState();
  const { getRace, addParticipants, updateRaceState } = useCrudRace();
  const { data: users } = useGetUsers();

  const [addModal, setAddModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getRace(id, setRace);
  }, [id]);

  const handleAddParticipant = async () => {
    if (selectedUsers.length < 1) {
      toast.error("Please select at least one participant.");
      return;
    }
    addParticipants(race.id, selectedUsers);
    setAddModal(false);
  };

  const handleStartTournament = () => {
    setConfirmModal(false);
    updateRaceState(id);
    toast.success("Tournament started successfully!");
  };

  function RenderTable({ status }) {
    if (client) {
      return (
        <RaceRankingTable
          client={true}
          race={race}
          participants={race.participants || []}
        />
      );
    }

    if (status == "Pending") {
      return (
        <RaceTableParticipants
          race={race}
          participants={race.participants || []}
        />
      );
    }

    if (status == "Underway") {
      return (
        <RaceMatchTable race={race} participants={race.participants || []} />
      );
    }

    if (status == "Awaiting_Review" || status == "Complete") {
      return (
        <RaceRankingTable race={race} participants={race.participants || []} />
      );
    }

    return (
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-white text-3xl mt-20 opacity-50">
          There's no race data as of the moment...
        </h1>
      </div>
    );
  }

  if (client == "true") {
    return (
      <DefaultLayout client={true}>
        {race ? (
          <>
            <div className="container mx-auto flex flex-col justify-starta items-start min-h-screen p-20 ">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="wrapper mb-5 flex items-center justify-center">
                  <Button
                    color={"dark"}
                    onClick={() => {
                      if (client) {
                        navigation("/events");
                      } else {
                        navigation("/admin/time-trial");
                      }
                    }}
                    className="mr-5"
                  >
                    Back
                  </Button>
                  <div className="flex justify-center items-center">
                    <h1 className="text-white text-sm md:text-3xl font-bold ">
                      {race.tournament.tournamentName}
                    </h1>
                    <Badge size={"lg"} className="ml-5 text-center">
                      <span className="text-xs md:text-lg text-center">
                        {race.status}
                      </span>
                    </Badge>
                  </div>
                </div>
                {race.status == "Pending" && !client && (
                  <div className="flex">
                    <Button
                      className="mr-3"
                      onClick={() => {
                        setAddModal(true);
                      }}
                    >
                      Add Participants
                    </Button>
                    {race.participants && (
                      <Button
                        color={"success"}
                        onClick={() => setConfirmModal(true)}
                        disabled={race.participants?.length <= 1}
                      >
                        Start Tournament
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <RenderTable status={race.status} />
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </DefaultLayout>
    );
  }

  return (
    <AdminLayout>
      {race ? (
        <>
          <TmsModal
            onSubmit={handleAddParticipant}
            title={"Add Participant"}
            size={"5xl"}
            openModal={addModal}
            handleClose={() => setAddModal(false)}
          >
            <AddParticipantsTable
              race={true}
              event={race?.tournament?.tournamentEvent}
              setSelectedUsers={setSelectedUsers}
              users={users}
            />
          </TmsModal>

          <TmsModal
            onSubmit={handleStartTournament}
            title={"Confirm Start"}
            size={"md"}
            openModal={confirmModal}
            handleClose={() => setConfirmModal(false)}
          >
            <p>Are you sure you want to start the tournament?</p>
          </TmsModal>

          <div className="container mx-auto flex flex-col justify-starta items-start min-h-screen mt-20 ">
            <div className="flex items-center justify-between w-full mb-2">
              <div className="wrapper mb-5 flex items-center justify-center">
                <Button
                  color={"dark"}
                  onClick={() => {
                    if (client) {
                      navigation("/events");
                    } else {
                      navigation("/admin/time-trial");
                    }
                  }}
                  className="mr-5"
                >
                  Back
                </Button>
                <div className="flex justify-center items-center">
                  <h1 className="text-white text-sm md:text-3xl font-bold ">
                    {race.tournament.tournamentName}
                  </h1>
                  <Badge size={"lg"} className="ml-5 text-center">
                    <span className="text-xs md:text-lg text-center">
                      {race.status}
                    </span>
                  </Badge>
                </div>
              </div>
              {race.status == "Pending" && (
                <div className="flex">
                  <Button
                    className="mr-3"
                    onClick={() => {
                      setAddModal(true);
                    }}
                  >
                    Add Participants
                  </Button>
                  {race.participants && (
                    <Button
                      color={"success"}
                      onClick={() => setConfirmModal(true)}
                      disabled={race.participants?.length <= 1}
                    >
                      Start Tournament
                    </Button>
                  )}
                </div>
              )}
            </div>
            <RenderTable status={race.status} />
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </AdminLayout>
  );
};

export default ViewTimeTrial;
