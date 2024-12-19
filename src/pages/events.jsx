import { useState } from "react";
import { FaTrophy, FaClock } from "react-icons/fa"; // Importing icons
import SingleElimination from "../components/singleElimination";
import Title from "../components/title";
import TmsSelect from "../components/tmsSelect";
import DefaultLayout from "../layout/defaultLayout";
import AdminTournament from "../pages/admin-tournaments";
import { useStore } from "../zustand/store";
import AdminTimeTrial from "./admin-time-trial";
import { Button } from "flowbite-react";

const Events = () => {
  const { currentEvent } = useStore();
  const [selectedEventType, setSelectedEventType] = useState("brackets"); // State for filter

  return (
    <DefaultLayout>
      <Title title={"Events Display"} />
      <div className="container mx-auto p-5">
        {/* Filter Buttons */}
        <div className="mb-5 flex justify-start gap-4 border">
          <Button
            color={selectedEventType === "brackets" ? "info" : "light"}
            onClick={() => setSelectedEventType("brackets")}
            className="flex items-center gap-2"
          >
            <FaTrophy /> {/* Trophy icon */}
            Tournaments
          </Button>
          <Button
            color={selectedEventType !== "brackets" ? "info" : "light"}
            onClick={() => setSelectedEventType("timeTrial")}
            className="flex items-center gap-2"
          >
            <FaClock /> {/* Clock icon */}
            Time Trial
          </Button>
        </div>

        {/* Conditional Rendering Based on Filter */}
        {selectedEventType === "brackets" && (
          <AdminTournament currentEvent={currentEvent} client={true} />
        )}
        {selectedEventType === "timeTrial" && (
          <AdminTimeTrial userEvent={currentEvent} client={true} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Events;
