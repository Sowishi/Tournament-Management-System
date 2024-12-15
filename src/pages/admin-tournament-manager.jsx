import { useState } from "react";
import { Button } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import TmsModal from "../components/tmsModal";
import { toast } from "react-toastify";
import useCrudAdmin from "../hooks/useCrudAdmin";
import useGetEventName from "../hooks/useGetEventName";
import { TournamentManagerTable } from "../components/tournamentManagerTable";
import useCrudTournament from "../hooks/useCrudTournament";

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

      if (isUpdate) {
        updateAdmin(forms);
      } else {
        addAdmin({ ...forms, tournamentID: selectedTournament.tournament.id });
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

  console.log(tournamentManagers);

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleSubmit}
        title={isUpdate ? "Update Admin" : "Create Admin"}
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
          <select onChange={handleChange} name="assignTournament">
            {tournaments.map((tournamentObj) => (
              <option
                key={tournamentObj.tournament.id}
                value={tournamentObj.tournament.name}
              >
                {tournamentObj.tournament.name}
              </option>
            ))}
          </select>
        </div>
      </TmsModal>
      <div className="container mx-auto mt-10 px-5 pb-20">
        <h1 className="text-white text-4xl font-bold">Tournament Managers</h1>
        <div className="wrapper mt-10 flex justify-end items-center">
          <Button onClick={resetForm}>Create Admin</Button>
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
