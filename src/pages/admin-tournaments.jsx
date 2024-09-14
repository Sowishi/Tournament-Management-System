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

const AdminTournament = () => {
  const [createModal, setCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState();
  const { addTournament, data, deleteTournament, loading } =
    useCrudTournament();
  const { data: eventNames } = useGetEventName();

  const [forms, setForms] = useState({
    tournamentName: "",
    tournamentEvent: "RSCUAA",
    tournamentType: "single elimination",
    startAt: "",
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

  const filterEvent = eventNames.map((item) => {
    return item.eventName;
  });

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
          <TmsInput
            name={"startAt"}
            type={"datetime-local"}
            onChange={handleChange}
            label={"Tournament Start"}
            dark={true}
          />
          <TmsSelect
            name={"tournamentType"}
            onChange={handleChange}
            data={["single elimination", "double elimination", "swiss"]}
            label={"Tournament Type"}
            dark={true}
          />
          <TmsSelect
            dark
            label={"Tournament Event"}
            name={"tournamentEvent"}
            data={filterEvent}
            onChange={handleChange}
          />
        </form>
      </TmsModal>

      <div className="container  mx-auto my-10">
        <div className="wrapper flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold mb-5">Tournament</h1>
          <Button onClick={() => setCreateModal(true)}>
            Create Tournament
          </Button>
        </div>
        <div className="flex flex-wrap">
          {loading && (
            <>
              <div className="flex justify-center items-center w-full p-20">
                <Spinner size={"lg"} />
              </div>
            </>
          )}
          {!loading &&
            data.map((item) => {
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
