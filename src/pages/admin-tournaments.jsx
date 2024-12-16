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
import sports from "../utils/sports";

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
    tournamentEvent: currentAdmin ? currentAdmin?.sportsEvent : "",
    tournamentType: "",
  });

  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSportChange = (event) => {
    const selected = event.target.value;
    setSelectedSport(selected);
    setSelectedCategory(""); // Reset category selection when sport changes
    setSelectedGender(""); // Reset gender selection when sport changes
  };

  const selectedSportData = sports.find(
    (sport) => sport.sport === selectedSport
  );

  const [selectedEvent, setSelectedEvent] = useState(
    currentAdmin ? currentAdmin?.sportsEvent : ""
  );

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

    const tournamentParameter = {
      ...forms,
      categories: {
        selectedCategory,
        selectedEvent,
        selectedGender,
      },
    };
    const res = await addTournament(tournamentParameter);
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

  const filterTournament = async () => {
    const filteredData = await Promise.all(
      data.map(async (item) => {
        const tournaInfo = await JSON.parse(item.tournament.description);
        if (client) {
          if (currentEvent === tournaInfo.eventName) {
            return item; // Include the item if it matches
          }
        } else {
          if (selectedEvent === "all") return item;
          if (tournaInfo.eventName === selectedEvent) return item;
        }
        return null; // Exclude the item if it doesn't match
      })
    );

    // Filter out null values (non-matching items)
    return filteredData.filter((item) => item !== null);
  };

  useEffect(() => {
    filterTournament().then((filteredData) => {
      setFilteredData(filteredData);
    });
  }, [data]);

  console.log(filteredData);

  return (
    <AdminLayout client={client}>
      <TmsModal
        onSubmit={handleAddTournament}
        title={"Create Tournament"}
        openModal={createModal}
        handleClose={() => setCreateModal(false)}
      >
        <form>
          <TmsSelect
            dark={true}
            name="sport"
            label="Select Sport"
            data={["Select Sport", ...sports.map((sport) => sport.sport)]}
            onChange={handleSportChange}
            value={selectedSport}
          />

          {selectedSportData?.categories &&
            selectedSportData.categories.length > 0 && (
              <TmsSelect
                dark={true}
                name="category"
                label="Select Category"
                data={["Select Category", ...selectedSportData.categories]}
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              />
            )}

          {selectedSportData?.genders && (
            <TmsSelect
              dark={true}
              name="gender"
              label="Select Gender"
              data={["Select Gender", ...selectedSportData.genders]}
              onChange={(e) => setSelectedGender(e.target.value)}
              value={selectedGender}
            />
          )}

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
            disable={true}
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
            filteredData.map((item) => (
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

          {filteredData.length <= 0 && !loading && (
            <>
              <h1 className="text-white opacity-50 font-bold text-2xl text-center p-20 w-full ">
                There's no tournaments as of the moment...
              </h1>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTournament;
