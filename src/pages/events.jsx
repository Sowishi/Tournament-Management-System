import SingleElimination from "../components/singleElimination";
import Title from "../components/title";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";

const Events = () => {
  const teams = ["team1", "team2", "team3", "team4"];

  return (
    <DefaultLayout>
      <Title title={"Events Display"} />

      <div className="header flex m-5">
        <div className="wrapper ml-10 flex">
          <TmsSelect data={["Select Tournament", "Bicol Meet"]} />
          <div className="mx-3">
            <TmsSelect data={["Category"]} />
          </div>
          <TmsSelect data={["Default"]} />
        </div>
      </div>
      <SingleElimination teams={teams} />
    </DefaultLayout>
  );
};

export default Events;
