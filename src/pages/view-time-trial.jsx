import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import RaceTable from "../components/raceTable";
import { Badge, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import useCrudRace from "../hooks/useCrudRace";

const ViewTimeTrial = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [race, setRace] = useState();
  const { getRace } = useCrudRace();

  useEffect(() => {
    getRace(id, setRace);
  }, []);

  return (
    <AdminLayout>
      {race ? (
        <div className="container mx-auto flex flex-col justify-center items-start min-h-[85vh]">
          <div className="wrapper mb-5 flex items-center justify-center ">
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
          <RaceTable />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </AdminLayout>
  );
};

export default ViewTimeTrial;
