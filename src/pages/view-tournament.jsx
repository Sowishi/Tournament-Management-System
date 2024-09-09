import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import { Badge, Button } from "flowbite-react";

const ViewTournament = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const tournament = {
    name: queryParams.get("name"),
    date: queryParams.get("date"),
    tournament_type: queryParams.get("tournament_type"),
    description: queryParams.get("description"),
    participants_count: queryParams.get("participants_count"),
  };
  return (
    <AdminLayout>
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
          <Button>Add Participants</Button>
        </div>
        <iframe
          src={`https://challonge.com/${id}/module`}
          width="100%"
          height="500"
          frameborder="0"
          scrolling="auto"
          allowtransparency="true"
        ></iframe>
        <div className="wrapper flex items-center mt-5">
          <h1 className="text-white text-3xl font-bold">
            Tournament Participants
          </h1>
          <Badge className="ml-3">{tournament.participants_count}</Badge>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewTournament;
