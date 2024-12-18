import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import RaceTable from "../components/raceTable";
import { Badge, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import useCrudRace from "../hooks/useCrudRace";
import TmsModal from "../components/tmsModal";
import AddParticipantsTable from "../components/addParticipantsTable";
import useGetUsers from "../hooks/useGetUsers";
import { toast } from "react-toastify";

const ViewTimeTrial = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [race, setRace] = useState();
  const { getRace, addParticipant } = useCrudRace();
  const { data: users } = useGetUsers();

  const [addModal, setAddModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getRace(id, setRace);
  }, [id]);

  const handleAddParticpant = () => {
    let error = false;
    if (selectedUsers.length >= 1) {
      selectedUsers.map((user) => {
        error = addParticipant(race.id, user);
      });
    }

    if (error) {
      toast.error("Participants Already Exist");
    } else {
      toast.success("Successfully Added Participant");
    }

    setAddModal(false);
  };

  return (
    <AdminLayout>
      {race ? (
        <>
          <TmsModal
            onSubmit={handleAddParticpant}
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
          <div className="container mx-auto flex flex-col justify-center items-start min-h-[85vh]">
            <div className="flex items-center justify-between w-full mb-2">
              <div className="wrapper mb-5 flex items-center justify-center f ">
                <Button
                  color={"dark"}
                  onClick={() => setOpenMenu(!openMenu)}
                  className="mr-5"
                >
                  Menu
                </Button>
                <Button
                  onClick={() => navigation("/admin/time-trial")}
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
                      Time Trial
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="flex">
                <Button
                  className="mr-3"
                  onClick={() => {
                    setAddModal(true);
                  }}
                >
                  Add Participants
                </Button>
                <Button color={"success"}>Start Tournament</Button>
              </div>
            </div>

            <RaceTable raceData={race.participants || []} />
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </AdminLayout>
  );
};

export default ViewTimeTrial;
