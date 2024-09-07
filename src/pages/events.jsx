import SingleElimination from "../components/singleElimination";
import Title from "../components/title";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";

const Events = () => {
  const teams = ["team1", "team2", "team3", "team4"];

  return (
    <DefaultLayout>
      <Title title={"Events Display"} />
    </DefaultLayout>
  );
};

export default Events;
