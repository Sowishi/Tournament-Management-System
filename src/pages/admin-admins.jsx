import { Button } from "flowbite-react";
import { AdminTable } from "../components/adminTable";
import AdminLayout from "../layout/adminLayout";
import { TmsModal } from "../components/tmsModal";
import { useState } from "react";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudAdmin from "../hooks/useCrudAdmin";
import { toast } from "react-toastify";

const AdminAdmins = () => {
  const [createModal, setCreateModal] = useState(false);
  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Event Admin",
  });

  const { addAdmin } = useCrudAdmin();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });
  };

  const handleAddAdmin = () => {
    addAdmin(forms);
    toast.success("Successfull add admin");
    setCreateModal(false);
  };

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleAddAdmin}
        title={"Create Admin"}
        openModal={createModal}
        handleClose={() => setCreateModal(false)}
      >
        <div className="container mx-auto p-3">
          <TmsInput
            onChange={handleChange}
            name={"fullName"}
            dark={true}
            label={"Full Name"}
            placeHolder={"Full Name"}
          />
          <TmsInput
            onChange={handleChange}
            name={"email"}
            dark={true}
            label={"Email"}
            placeHolder={"Email"}
          />
          <TmsInput
            onChange={handleChange}
            name={"password"}
            dark={true}
            label={"Password"}
            placeHolder={"Password"}
            type={"password"}
          />
          <TmsSelect
            dark
            label={"Role"}
            onChange={handleChange}
            name={"role"}
            data={["Event Admin", "Document Admin"]}
          />
        </div>
      </TmsModal>
      <div className="container mx-auto mt-10">
        <h1 className="text-white text-4xl font-bold">All Admins</h1>
        <div className="wrapper mt-10 flex justify-between items-center ">
          <div className="wrapper flex">
            <Button color={"info"} className="mx-3">
              Event Admin
            </Button>
            <Button color={"light"}>Document Admin</Button>
          </div>
          <Button onClick={() => setCreateModal(true)}>Create Admin</Button>
        </div>
        <AdminTable />
      </div>
    </AdminLayout>
  );
};

export default AdminAdmins;
