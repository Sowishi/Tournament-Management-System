import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { TallyTable } from "../components/tallyTable";

const Tally = () => {
  return (
    <DefaultLayout>
      <Title title={"Tally of Medals"} />
      <div className="container mx-auto mt-10">
        <TallyTable />
      </div>
    </DefaultLayout>
  );
};

export default Tally;
