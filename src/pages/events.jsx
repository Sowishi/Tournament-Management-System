import SingleElimination from "../components/singleElimination";
import Title from "../components/title";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";
import AdminTournament from "../pages/admin-tournaments";

const Events = () => {
  const teams = ["team1", "team2", "team3", "team4"];

  return (
    <DefaultLayout>
      <Title title={"Events Display"} />
      <div className="container mx-auto p-5">
        <AdminTournament client={true} />
      </div>
    </DefaultLayout>
  );
};

export default Events;
