import { Button, Spinner } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useEffect, useState } from "react";
import TmsModal from "../components/tmsModal";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudRace from "../hooks/useCrudRace";
import { toast } from "react-toastify";
import TournamentCardRace from "../components/tournamentCardRace";
import { motion } from "framer-motion";
import { useStore } from "../zustand/store";
import timeTrialSports from "../utils/timeTrialSport";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const AdminTimeTrial = ({ client }) => {
  const [createModal, setCreateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false); // Confirmation modal for add
  const [deleteModal, setDeleteModal] = useState(false); // Confirmation modal for delete
  const [selectedTournament, setSelectedTournament] = useState(); // Tournament to delete
  const [loading, setLoading] = useState(false);
  const { currentAdmin, currentEvent } = useStore();
  const { addRace, getRaces, deleteRace } = useCrudRace();
  const [races, setRaces] = useState([]);
  const [forms, setForms] = useState({
    tournamentName: "",
    tournamentEvent: currentAdmin?.sportsEvent || "",
    tournamentType: "",
  });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  // Fetch races on mount
  useEffect(() => {
    getRaces(setRaces);
  }, []);

  // Handle sport change
  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
    setSelectedCategory("");
    setSelectedGender("");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!selectedSport) {
      toast.error("Please select a Sport.");
      return false;
    }
    if (!selectedCategory) {
      toast.error("Please select a Category.");
      return false;
    }
    if (!selectedGender) {
      toast.error("Please select a Gender.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setConfirmModal(true); // Show confirmation modal for add
    }
  };

  const handleConfirmAddTournament = () => {
    forms.tournamentName =
      selectedSport + " " + selectedCategory + " " + selectedGender;

    const tournamentParameter = {
      ...forms,
      categories: {
        selectedCategory,
        selectedSport,
        selectedGender,
      },
    };
    addRace({ tournament: tournamentParameter });
    setCreateModal(false);
    setConfirmModal(false);
    toast.success("Tournament successfully added!");
  };

  const handleDeleteTournament = () => {
    setDeleteModal(false);
    toast.success("Tournament deleted successfully!");
    deleteRace(selectedTournament?.id);
  };

  const selectedSportData = timeTrialSports.find(
    (sport) => sport.sport === selectedSport
  );

  const navigation = useNavigate();

  const filterRaces = races.filter((race) => {
    if (race.tournament.tournamentEvent == currentAdmin?.sportsEvent) {
      return race;
    }
  });

  return (
    <AdminLayout client={client}>
      {/* Tournament Creation Modal */}
      <TmsModal
        onSubmit={handleSubmit}
        title={"Create Tournament"}
        openModal={createModal}
        handleClose={() => setCreateModal(false)}
      >
        <form>
          <TmsSelect
            dark
            name="sport"
            label="Select Sport"
            data={[
              "Select Sport",
              ...timeTrialSports.map((sport) => sport.sport),
            ]}
            onChange={handleSportChange}
            value={selectedSport}
          />
          {selectedSportData?.categories && (
            <TmsSelect
              dark
              name="category"
              label="Select Category"
              data={["Select Category", ...selectedSportData.categories]}
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            />
          )}
          {selectedSportData?.genders && (
            <TmsSelect
              dark
              name="gender"
              label="Select Gender"
              data={["Select Gender", ...selectedSportData.genders]}
              onChange={(e) => setSelectedGender(e.target.value)}
              value={selectedGender}
            />
          )}
          <TmsInput
            disable={true}
            placeHolder="Enter Tournament Name"
            name="tournamentName"
            value={
              selectedSport + " " + selectedCategory + " " + selectedGender
            }
            label="Tournament Name"
            dark
          />
          <TmsSelect
            disable
            dark
            label="Tournament Event"
            name="tournamentEvent"
            data={[currentAdmin?.sportsEvent]}
            onChange={handleChange}
            value={forms.tournamentEvent}
          />
        </form>
      </TmsModal>

      {/* Confirmation Modal for Add */}
      <TmsModal
        title="Confirm Tournament Creation"
        openModal={confirmModal}
        handleClose={() => setConfirmModal(false)}
        onSubmit={handleConfirmAddTournament}
      >
        <p>Are you sure you want to create this tournament?</p>
      </TmsModal>

      {/* Confirmation Modal for Delete */}
      <TmsModal
        title="Confirm Delete"
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
        onSubmit={handleDeleteTournament}
      >
        <p>Are you sure you want to delete this tournament?</p>
      </TmsModal>

      {/* Tournaments List */}
      <div className="container mx-auto px-5 my-10">
        {!client && currentAdmin.role !== "Tournament Manager" && (
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center justify-start ">
              <Button
                className="mr-5"
                onClick={() => {
                  navigation("/admin/select-tournament");
                }}
              >
                Back
              </Button>
              <h1 className="text-white text-4xl font-bold">
                Tournaments (Time Trial){" "}
              </h1>
              <FaClock className="text-blue-400 text-6xl mb-4 ml-3" />
            </div>

            {!currentEvent?.status && (
              <Button onClick={() => setCreateModal(true)}>
                Create Tournament
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-wrap">
          {loading && (
            <div className="flex justify-center items-center w-full p-20">
              <Spinner size={"lg"} />
            </div>
          )}
          {!loading &&
            filterRaces.map((item) => (
              <motion.div
                key={item.id}
                className="basis-full md:basis-3/12 my-5 p-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <TournamentCardRace
                  client={client}
                  tournament={item}
                  onDelete={() => {
                    setSelectedTournament(item);
                    setDeleteModal(true);
                  }}
                />
              </motion.div>
            ))}
          {races.length === 0 && !loading && (
            <h1 className="text-white opacity-50 font-bold text-2xl text-center p-20 w-full">
              There's no tournaments at the moment...
            </h1>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTimeTrial;
