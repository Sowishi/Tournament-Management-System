import { Button } from "flowbite-react";
import { AdminTable } from "../components/adminTable";
import AdminLayout from "../layout/adminLayout";
import { useState } from "react";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudAdmin from "../hooks/useCrudAdmin";
import { toast } from "react-toastify";
import TmsModal from "../components/tmsModal";

const AdminAdmins = () => {
  const [createModal, setCreateModal] = useState(false);
  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Event Admin",
  });
  const [currentRole, setCurrentRole] = useState("All");
  const [isUpdate, setIsUpdate] = useState(false);

  const { addAdmin, updateAdmin, data } = useCrudAdmin();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });
  };

  const handleAddAdmin = () => {
    addAdmin(forms);
    toast.success("Successfully add admin");
    setCreateModal(false);
  };

  const handleUpdateAdmin = () => {
    updateAdmin(forms);
    toast.success("Successfully update admin");
    setCreateModal(false);
  };

  const handleUpdateForms = (forms) => {
    setForms(forms);
    setIsUpdate(true);
    setCreateModal(true);
  };

  const filterData = data.filter((item) => {
    if (item.role == currentRole) {
      return item;
    }
  });

  const filterWithoutMasterAdmin = data.filter((item) => {
    if (item.role !== "Master Admin") {
      return item;
    }
  });
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
            name={"fullName"}
            dark={true}
            label={"Full Name"}
            placeHolder={"Full Name"}
          />
          <TmsInput
            onChange={handleChange}
            value={forms.email}
            name={"email"}
            dark={true}
            label={"Email"}
            placeHolder={"Email"}
          />
          <TmsInput
            value={forms.password}
            onChange={handleChange}
            name={"password"}
            dark={true}
            label={"Password"}
            placeHolder={"Password"}
          />
          <TmsSelect
            value={forms.role}
            dark
            label={"Role"}
            onChange={handleChange}
            name={"role"}
            data={["Event Admin", "Document Admin"]}
          />
        </div>
      </TmsModal>
      <div className="container mx-auto mt-10 pb-20">
        <h1 className="text-white text-4xl font-bold">All Admins</h1>
        <div className="wrapper mt-10 flex justify-between items-center ">
          <div className="wrapper flex">
            <Button
              onClick={() => setCurrentRole("All")}
              color={currentRole == "All" ? "info" : "light"}
              className="mx-3"
            >
              All
            </Button>
            <Button
              onClick={() => setCurrentRole("Event Admin")}
              color={currentRole == "Event Admin" ? "info" : "light"}
              className="mx-3"
            >
              Event Admin
            </Button>
            <Button
              onClick={() => setCurrentRole("Document Admin")}
              color={currentRole == "Document Admin" ? "info" : "light"}
            >
              Document Admin
            </Button>
          </div>
          <Button
            onClick={() => {
              setIsUpdate(false);
              setForms({
                fullName: "",
                email: "",
                password: "",
                role: "Event Admin",
              });
              setCreateModal(true);
            }}
          >
            Create Admin
          </Button>
        </div>
        <AdminTable
          data={currentRole == "All" ? filterWithoutMasterAdmin : filterData}
          handleUpdateForms={handleUpdateForms}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAdmins;
