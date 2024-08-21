import SingleElimination from "../components/singleElimination";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";

const Events = () => {
  const teams = ["team1", "team2", "team3", "team4"];

  return (
    <DefaultLayout>
      <div className="header flex m-5">
        <h1 className="text-white justify-center items-center  font-bold text-4xl">
          Events Display
        </h1>
        <div className="wrapper ml-10 flex">
          <TmsSelect data={["Select Events", "Bicol Meet"]} />
          <div className="mx-3">
            <TmsSelect data={["Select Events"]} />
          </div>
          <TmsSelect data={["Select Events"]} />
        </div>
      </div>
      <SingleElimination teams={teams} />
    </DefaultLayout>
  );
};

export default Events;
