import SingleElimination from "../components/singleElimination";
import Title from "../components/title";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";
import AdminTournament from "../pages/admin-tournaments";
import { useStore } from "../zustand/store";

const Events = () => {
  const { currentEvent } = useStore();
  return (
    <DefaultLayout>
      <Title title={"Events Display"} />
      <div className="container mx-auto p-5">
        <AdminTournament currentEvent={currentEvent} client={true} />
      </div>
    </DefaultLayout>
  );
};

export default Events;
