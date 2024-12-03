import { Button } from "flowbite-react";
import { AdminTable } from "../components/adminTable";
import AdminLayout from "../layout/adminLayout";
import { useState } from "react";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudAdmin from "../hooks/useCrudAdmin";
import { toast } from "react-toastify";
import TmsModal from "../components/tmsModal";
import useGetEventName from "../hooks/useGetEventName";

const AdminAdmins = () => {
  const [createModal, setCreateModal] = useState(false);
  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    sportsEvent: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentRole, setCurrentRole] = useState("All");
  const [isUpdate, setIsUpdate] = useState(false);

  const { addAdmin, updateAdmin, data } = useCrudAdmin();
  const { data: eventNames } = useGetEventName();

  // Map event names from API response
  const formatEventNames = eventNames.map((item) => item.eventName);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });

    // Clear validation errors on change
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!forms.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }

    if (
      !forms.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forms.email)
    ) {
      errors.email = "A valid Email is required.";
    }

    if (!forms.password.trim() || forms.password.length < 8) {
      errors.password =
        "Password is required and must be at least 8 characters long.";
    }

    if (!forms.role || forms.role === "Please Select Admin") {
      errors.role = "Please select a valid role.";
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

  const handleAddAdmin = () => {
    if (validateForm()) {
      addAdmin(forms);
      toast.success("Successfully added admin.");
      setCreateModal(false);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleUpdateAdmin = () => {
    if (validateForm()) {
      updateAdmin(forms);
      toast.success("Successfully updated admin.");
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

  const filterData = data.filter((item) => item.role === currentRole);

  const filterWithoutMasterAdmin = data.filter(
    (item) => item.role !== "Master Admin" && item.userType === "admin"
  );

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={isUpdate ? handleUpdateAdmin : handleAddAdmin}
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
            value={forms.role}
            dark
            label="Role"
            onChange={handleChange}
            name="role"
            data={["Please Select Admin", "Event Admin", "Document Admin"]}
            error={validationErrors.role}
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
        <h1 className="text-white text-4xl font-bold">All Admins</h1>
        <div className="wrapper mt-10 flex justify-between items-center">
          <div className="wrapper flex">
            <Button
              className="mx-1"
              onClick={() => setCurrentRole("All")}
              color={currentRole === "All" ? "info" : "light"}
            >
              <h1 className="text-xs ">All</h1>
            </Button>
            <Button
              className="mx-1"
              onClick={() => setCurrentRole("Event Admin")}
              color={currentRole === "Event Admin" ? "info" : "light"}
            >
              <h1 className="text-xs ">Event </h1>
            </Button>
            <Button
              className="mx-1"
              onClick={() => setCurrentRole("Document Admin")}
              color={currentRole === "Document Admin" ? "info" : "light"}
            >
              <h1 className="text-xs ">Document </h1>
            </Button>
          </div>
          <Button
            onClick={() => {
              setIsUpdate(false);
              setForms({
                fullName: "",
                email: "",
                password: "",
                role: "",
                sportsEvent: "",
              });
              setValidationErrors({});
              setCreateModal(true);
            }}
          >
            Create Admin
          </Button>
        </div>
        <AdminTable
          data={currentRole === "All" ? filterWithoutMasterAdmin : filterData}
          handleUpdateForms={handleUpdateForms}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAdmins;
