import { Button } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useEffect, useState } from "react";
import TmsModal from "../components/tmsModal";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudTournament from "../hooks/useCrudTournament";
import { toast } from "react-toastify";

const AdminTournament = () => {
  const [createModal, setCreateModal] = useState(false);

  const { addTournament } = useCrudTournament();

  const [forms, setForms] = useState({
    tournamentName: "",
    description: "",
    tournamentType: "single elimination",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleAddTournament = async () => {
    const res = await addTournament(forms);
    if (res.error) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setCreateModal(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto my-10">
        <TmsModal
          onSubmit={handleAddTournament}
          title={"Create Tournament"}
          openModal={createModal}
          handleClose={() => {
            setCreateModal(true);
          }}
        >
          <form>
            <TmsInput
              name={"tournamentName"}
              onChange={handleChange}
              label={"Tournament Name"}
              dark={true}
            />
            <TmsSelect
              name={"tournamentType"}
              onChange={handleChange}
              data={["single elimination", "double elimination"]}
              label={"Tournament Type"}
              dark={true}
            />
            <TmsInput
              name={"description"}
              onChange={handleChange}
              label={"Tournament Description"}
              dark={true}
            />
          </form>
        </TmsModal>
        <div className="wrapper flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold mb-5">Tournament</h1>
          <Button onClick={() => setCreateModal(true)}>
            Create Tournament
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTournament;
