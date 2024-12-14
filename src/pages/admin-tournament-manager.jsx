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

const AdminTournamentManager = () => {
  const [createModal, setCreateModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Tournament Manager",
    sportsEvent: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { addAdmin, updateAdmin, data } = useCrudAdmin();
  const { data: eventNames } = useGetEventName();

  const formatEventNames = eventNames.map((item) => item.eventName);

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
    if (
      !forms.sportsEvent ||
      forms.sportsEvent === "Please Select Assigned Event"
    ) {
      errors.sportsEvent = "Please select a valid sports event.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isUpdate) {
        updateAdmin(forms);
        toast.success("Successfully updated admin.");
      } else {
        console.log(forms);
        // addAdmin(forms);
        // toast.success("Successfully added admin.");
      }
      setCreateModal(false);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleUpdateForms = (forms) => {
    setForms(forms);
    setIsUpdate(true);
    setCreateModal(true);
  };

  const resetForm = () => {
    setForms({
      fullName: "",
      email: "",
      password: "",
      role: "Tournament Manager",
      sportsEvent: "",
    });
    setValidationErrors({});
    setIsUpdate(false);
    setCreateModal(true);
  };

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
          <TmsSelect
            value={forms.sportsEvent}
            dark
            label="Sports Event"
            onChange={handleChange}
            name="sportsEvent"
            data={["Please Select Assigned Event", ...formatEventNames]}
            error={validationErrors.sportsEvent}
          />
        </div>
      </TmsModal>
      <div className="container mx-auto mt-10 px-5 pb-20">
        <h1 className="text-white text-4xl font-bold">Tournament Managers</h1>
        <div className="wrapper mt-10 flex justify-end items-center">
          <Button onClick={resetForm}>Create Admin</Button>
        </div>
        <TournamentManagerTable
          data={[]}
          handleUpdateForms={handleUpdateForms}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminTournamentManager;
