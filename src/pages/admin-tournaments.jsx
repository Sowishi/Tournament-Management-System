import { Button } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useEffect, useState } from "react";
import TmsModal from "../components/tmsModal";
import TmsInput from "../components/tmsInput";
import TmsSelect from "../components/tmsSelect";
import useCrudTournament from "../hooks/useCrudTournament";
import { toast } from "react-toastify";
import TournamentCard from "../components/tournamentCard";

const AdminTournament = () => {
  const [createModal, setCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState();
  const { addTournament, data, deleteTournament } = useCrudTournament();

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
    window.location.reload();
  };

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleAddTournament}
        title={"Create Tournament"}
        openModal={createModal}
        handleClose={() => {
          setCreateModal(false);
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
            data={["single elimination", "double elimination", "swiss"]}
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
      <TmsModal
        hideFooter
        title={"View Tournament"}
        openModal={showModal}
        handleClose={() => setShowModal(false)}
        size={"7xl"}
      >
        {selectedTournament?.state == "complete" && (
          <div className="flex flex-col justify-center items-center  mb-5">
            <h1 className="text-4xl font-bold text-center">
              Tournament Completed! 🎉{" "}
            </h1>
            <Button className="my-2">
              <a
                href={`https://challonge.com/${selectedTournament.url}`}
                target="_blank"
              >
                View Challonge Offical Result
              </a>
            </Button>
          </div>
        )}
        <iframe
          src={`${selectedTournament?.full_challonge_url}/module`}
          width="100%"
          height="500"
          frameborder="0"
          scrolling="auto"
          allowtransparency="true"
        ></iframe>{" "}
      </TmsModal>
      <div className="container  mx-auto my-10">
        <div className="wrapper flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold mb-5">Tournament</h1>
          <Button onClick={() => setCreateModal(true)}>
            Create Tournament
          </Button>
        </div>
        <div className="flex flex-wrap">
          {data.map((item) => {
            return (
              <div key={item} className="basis-3/12 my-5 p-5">
                <TournamentCard
                  deleteTournament={deleteTournament}
                  setShowModal={setShowModal}
                  setSelectedTournament={setSelectedTournament}
                  tournament={item}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTournament;
