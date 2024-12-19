import { useEffect, useState } from "react";
import { Button, Label } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import TmsModal from "../components/tmsModal";
import { toast } from "react-toastify";
import useCrudAdmin from "../hooks/useCrudAdmin";
import useGetEventName from "../hooks/useGetEventName";
import { TournamentManagerTable } from "../components/tournamentManagerTable";
import useCrudTournament from "../hooks/useCrudTournament";
import sendEmail from "../utils/sendEmail";
import { useStore } from "../zustand/store";
import useCrudRace from "../hooks/useCrudRace";

const AdminTournamentManager = () => {
  const [createModal, setCreateModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Tournament Manager",
    assignTournament: "", // Ensure this field is included
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { addAdmin, updateAdmin, data } = useCrudAdmin();
  const { data: tournaments } = useCrudTournament();
  const { data: eventNames } = useGetEventName();
  const { currentEvent } = useStore();
  const { getRaces } = useCrudRace();
  const [races, setRaces] = useState([]);
  const [selectedMode, setSelectedMode] = useState("Bracket");

  const handleChange = ({ target: { name, value } }) => {
    setForms({ ...forms, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!forms.fullName.trim()) errors.fullName = "Full Name is required.";
    if (
      !forms.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forms.email)
    ) {
      errors.email = "A valid Email is required.";
    }
    if (!forms.password.trim() || forms.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!forms.assignTournament.trim()) {
      errors.assignTournament = "Assigning a tournament is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedTournament = tournaments.find(
        (tournamentObj) =>
          tournamentObj.tournament.name === forms.assignTournament
      );

      const selectedRace = races.find(
        (tournamentObj) =>
          tournamentObj.tournament.tournamentName === forms.assignTournament
      );

      if (isUpdate) {
        updateAdmin({
          ...forms,
          tournamentID: selectedTournament.tournament.url,
          assignEvent: currentEvent.eventName,
        });
      } else {
        addAdmin({
          ...forms,
          tournamentID:
            selectedMode == "bracket"
              ? selectedTournament.tournament.url
              : selectedRace.id,
          assignEvent: currentEvent.eventName,
          tournamentMode: selectedMode,
        });

        sendEmail(
          forms,
          selectedMode == "bracket"
            ? selectedTournament.tournament.name
            : selectedRace.tournament.tournamentName
        );

        toast.success("Successfully created admin.");
      }
      setCreateModal(false);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleUpdateForms = (formData) => {
    setForms(formData);
    setIsUpdate(true);
    setCreateModal(true);
  };

  const resetForm = () => {
    setForms({
      fullName: "",
      email: "",
      password: "",
      role: "Tournament Manager",
      assignTournament: "",
    });
    setValidationErrors({});
    setIsUpdate(false);
    setCreateModal(true);
  };

  const tournamentManagers = data.filter(
    (user) => user.role === "Tournament Manager"
  );

  useEffect(() => {
    getRaces(setRaces);
  }, []);

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleSubmit}
        title={
          isUpdate ? "Update Tournament Manager" : "Create Tournament Manager"
        }
        openModal={createModal}
        handleClose={() => setCreateModal(false)}
      >
        <div className="container mx-auto p-3">
          <TmsInput
            value={forms.fullName}
            onChange={handleChange}
            name="fullName"
            dark
            label="Full Name"
            placeHolder="Full Name"
            error={validationErrors.fullName}
          />
          <TmsInput
            value={forms.email}
            onChange={handleChange}
            name="email"
            dark
            label="Email"
            placeHolder="Email"
            error={validationErrors.email}
          />
          <TmsInput
            value={forms.password}
            onChange={handleChange}
            name="password"
            dark
            label="Password"
            placeHolder="Password"
            error={validationErrors.password}
          />
          <div className="div flex flex-row justify-center items-center my-3">
            <Button
              onClick={() => setSelectedMode("bracket")}
              color={selectedMode == "bracket" ? "info" : "light"}
              className="mx-3 px-5"
            >
              Bracket
            </Button>
            <Button
              onClick={() => setSelectedMode("time trial")}
              color={selectedMode == "time trial" ? "info" : "light"}
              className="mx-3 px-5"
            >
              Time Trial
            </Button>
          </div>
          {selectedMode == "bracket" && (
            <div className="div flex flex-col my-3">
              <Label
                value="Assign Tournament"
                color={"white"}
                htmlFor="email1"
              />
              <select onChange={handleChange} name="assignTournament">
                {[
                  {
                    tournament: {
                      id: "1",
                      name: "Please select a tournament",
                    },
                  },
                  ...tournaments,
                ].map((tournamentObj) => (
                  <option
                    key={tournamentObj.tournament.id}
                    value={tournamentObj.tournament.name}
                  >
                    {tournamentObj.tournament.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedMode == "time trial" && (
            <div className="div flex flex-col my-3">
              <Label
                value="Assign Tournament"
                color={"white"}
                htmlFor="email1"
              />
              <select onChange={handleChange} name="assignTournament">
                {[
                  {
                    tournament: {
                      id: "1",
                      tournamentName: "Please select a tournament",
                    },
                  },
                  ...races,
                ].map((race) => (
                  <option
                    key={race.tournament.id}
                    value={race.tournament.tournamentName}
                  >
                    {race.tournament.tournamentName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </TmsModal>
      <div className="container mx-auto mt-10 px-5 pb-20">
        <h1 className="text-white text-4xl font-bold">
          Tournament Managers of{" "}
          <span className="text-blue-500 font-bold">
            {currentEvent?.eventName}
          </span>
        </h1>
        <div className="wrapper mt-10 flex justify-end items-center">
          <Button onClick={resetForm}>Create Tournament Manager</Button>
        </div>
        <TournamentManagerTable
          data={tournamentManagers}
          handleUpdateForms={handleUpdateForms}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminTournamentManager;
