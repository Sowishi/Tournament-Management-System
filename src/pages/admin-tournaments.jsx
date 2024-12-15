import { Button, Spinner } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useEffect, useState } from "react";
import TmsModal from "../components/tmsModal";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudTournament from "../hooks/useCrudTournament";
import { toast } from "react-toastify";
import TournamentCard from "../components/tournamentCard";
import useGetEventName from "../hooks/useGetEventName";
import useCrudCalendar from "../hooks/useCrudCalendar";
import moment from "moment";
import { motion } from "framer-motion";
import useCrudLogs from "../hooks/useCrudLogs";
import { useStore } from "../zustand/store";

const AdminTournament = ({ client, currentEvent }) => {
  const [createModal, setCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState();
  const { addTournament, data, deleteTournament, loading } =
    useCrudTournament();
  const { data: eventNames } = useGetEventName();

  const { addCalendar } = useCrudCalendar();
  const { currentUser, currentAdmin } = useStore();
  const { addLog } = useCrudLogs();

  const [forms, setForms] = useState({
    tournamentName: "",
    tournamentEvent: currentAdmin.sportsEvent,
    tournamentType: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(currentAdmin.sportsEvent);

  console.log(selectedEvent);

  const handleChange = (event) => {
    const { value, name } = event.target;

    // Map the display values to the saved values
    const valueMappings = {
      "Single-Elimination": "single elimination",
      "Double-Elimination": "double elimination",
      Swiss: "swiss",
      "Round-Robin": "round robin",
    };

    setForms((prev) => ({
      ...prev,
      [name]: valueMappings[value] || value, // Save the mapped value if it exists
    }));
  };

  const validateForm = () => {
    const { tournamentName, tournamentEvent, tournamentType } = forms;
    if (!tournamentName || !tournamentEvent || !tournamentType) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleAddTournament = async () => {
    if (!validateForm()) return;

    const res = await addTournament(forms);
    if (res.error) {
      toast.error(res.message);
      return;
    }

    const startDateMoment = moment().format("LLL"); // Today's date
    const endDateMoment = moment().add(7, "days").format("LLL"); // 7 days after today
    const output = {
      title: forms.tournamentName,
      eventName: forms.tournamentEvent,
      ["start"]: startDateMoment,
      ["end"]: endDateMoment,
    };

    addCalendar(output);
    addLog(currentUser, `Created a tournament: ${forms.tournamentName}`);

    setTimeout(() => {
      toast.success(res.message);
      setCreateModal(false);
      window.location.reload();
    }, 2000);
  };

  const filterEvent = eventNames.map((item) => item.eventName);

  const filterTournament = data.filter((item) => {
    if (client) {
      if (currentEvent === item.tournament.description) {
        return item;
      }
    } else {
      if (selectedEvent === "all") return item;
      if (item.tournament.description === selectedEvent) return item;
    }
    return null;
  });

  return (
    <AdminLayout client={client}>
      <TmsModal
        onSubmit={handleAddTournament}
        title={"Create Tournament"}
        openModal={createModal}
        handleClose={() => setCreateModal(false)}
      >
        <form>
          <TmsInput
            placeHolder={"Enter Tournament Name"}
            name={"tournamentName"}
            onChange={handleChange}
            label={"Tournament Name"}
            dark={true}
          />
          <TmsSelect
            name={"tournamentType"}
            onChange={handleChange}
            data={[
              "Please select tournament type",
              "Single-Elimination",
              "Double-Elimination",
              "Swiss",
              "Round-Robin",
            ]}
            label={"Tournament Type"}
            dark={true}
          />
          <TmsSelect
            dark
            label={"Tournament Event"}
            name={"tournamentEvent"}
            data={[currentAdmin?.sportsEvent]}
            onChange={handleChange}
          />
        </form>
      </TmsModal>

      <div className="container mx-auto px-5 my-10">
        {!client && currentAdmin.role !== "Tournament Manager" && (
          <div className="wrapper flex justify-between items-center mb-5">
            <h1 className="text-white text-4xl font-bold ">Tournament</h1>
            <Button onClick={() => setCreateModal(true)}>
              Create Tournament
            </Button>
          </div>
        )}
        <div className="flex flex-wrap">
          {loading && (
            <div className="flex justify-center items-center w-full p-20">
              <Spinner size={"lg"} />
            </div>
          )}
          {!loading &&
            filterTournament.map((item) => (
              <motion.div
                key={item.id}
                className="basis-full md:basis-3/12 my-5 p-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <TournamentCard
                  client={client}
                  deleteTournament={deleteTournament}
                  setShowModal={setShowModal}
                  setSelectedTournament={setSelectedTournament}
                  tournament={item}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTournament;
