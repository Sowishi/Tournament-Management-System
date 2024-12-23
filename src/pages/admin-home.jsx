import { Badge, Button, ListGroup, Spinner, Tabs } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useEffect, useState } from "react";
import TmsInput from "../components/tmsInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { toast } from "react-toastify";
import useAddCarouselPic from "../hooks/useAddCarouselPic";
import useGetCarouselPic from "../hooks/useGetCarouselPic";
import useDeleteCarouselPic from "../hooks/useDeleteCarouselPic";
import useAddEventName from "../hooks/useAddEventName";
import useGetEventName from "../hooks/useGetEventName";
import useDeleteEventName from "../hooks/useDeleteEventName";
import TmsModal from "../components/tmsModal";
import ConfirmationModals from "../components/confirmationModal";
import { HiOutlineTrash } from "react-icons/hi";
import useCrudCollegeName from "../hooks/useCrudCollegeName";
import TmsSelect from "../components/tmsSelect";
import { motion } from "framer-motion";
import useGetUsers from "../hooks/useGetUsers";
import useCrudTournament from "../hooks/useCrudTournament";
import { useStore } from "../zustand/store";
import { useNavigate } from "react-router-dom";
import PointSystem from "../components/pointSystem";
import { TallyTable } from "../components/tallyTable";
import { TallyTableAdmin } from "../components/tallyTableAdmin";
import { TallyTableEvent } from "../components/tallyTableEvent";
import useUpdateUser from "../hooks/useUpdateUser";
import useCrudTally from "../hooks/useCrudTally";
import useCrudRace from "../hooks/useCrudRace";

const AdminHome = () => {
  const [addPicModal, setAddPicModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState();
  const [deleteCarouselModal, setDeleteCarouselModal] = useState(false);
  const [selectedCarousel, setSelectedCarousel] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [addCollegeModal, setAddCollegeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [selectedCollegeName, setSelectedCollegeName] = useState();
  const [collegeDeleteModal, setCollegeDeleteModal] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState();

  // Hooks
  const { addCarouselPic } = useAddCarouselPic();
  const { addEventName } = useAddEventName();
  const { data } = useGetCarouselPic();
  const { data: eventNameData } = useGetEventName();
  const { deleteCarouselPic } = useDeleteCarouselPic();
  const { deleteEventName } = useDeleteEventName();

  const { data: users } = useGetUsers();
  const { deleteUser } = useUpdateUser();
  const { data: tally, deleteTally } = useCrudTally();
  const { data: tournaments, deleteTournament } = useCrudTournament();
  const { currentAdmin, currentEvent } = useStore();
  const [selectedEventFilter, setSelectedEventFilter] = useState(
    currentAdmin?.role == "Master Admin" ? "all" : currentAdmin?.sportsEvent
  );

  const [races, setRaces] = useState([]);

  const { getRaces, deleteRace } = useCrudRace();

  const navigation = useNavigate();
  const {
    addCollegeName,
    data: collegeNameData,
    deleteCollegeName,
  } = useCrudCollegeName();

  const uploadImage = async (file) => {
    setLoading(true);
    if (!file) return;

    // Create a reference to the storage location
    const storageRef = ref(storage, `carousel/${file.name}`);

    // Create an upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setLoading(false);
          setAddPicModal(false);
          toast.success("Uploaded Successfully");
          addCarouselPic(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      uploadImage(image);
    }
  };

  const handlUploadEvent = () => {
    if (eventName.length >= 1) {
      addEventName(eventName);
      setAddEventModal(false);
      toast.success("Successfully Added Event Name");
      setEventName("  ");
    } else {
      toast.error("Please enter your event name.");
    }
  };

  const handleUploadCollege = () => {
    if (currentAdmin?.role == "Master Admin") {
      if (collegeName.length >= 1 && selectedEventName?.length >= 1) {
        addCollegeName({
          collegeName,
          selectedEventName: selectedEventName,
        });
        setAddCollegeModal(false);
        toast.success("Successfully Added Delegate Name");
        setCollegeName("");
      } else {
        toast.error("Please fill up the fields.");
      }
    } else {
      if (collegeName.length >= 1) {
        addCollegeName({
          collegeName,
          selectedEventName: currentAdmin?.sportsEvent,
        });
        setAddCollegeModal(false);
        toast.success("Successfully Added Delegate Name");
        setCollegeName("");
      } else {
        toast.error("Delegates Name is Missing");
      }
    }
  };

  const formatEventNames = eventNameData.map((item) => {
    return item.eventName;
  });

  const filterCollegeName = collegeNameData.filter((item) => {
    if (selectedEventFilter == "all") {
      return item;
    }
    if (item.event == selectedEventFilter) {
      return item;
    }
  });

  const activeUsers = users.filter((user) => {
    if (user.status == "Approved") {
      return user;
    }
  });

  const activeUsersEvent = users.filter((user) => {
    if (
      user.status == "Approved" &&
      user.sportsEvent == currentAdmin?.sportsEvent
    ) {
      return user;
    }
  });

  const handleDeleteEvent = () => {
    const eventName = selectedEvent.eventName;

    const delegateData = collegeNameData.filter((item) => {
      if (item.event == eventName) {
        return item;
      }
    });

    const tallyData = tally.filter((item) => {
      const { event } = item;
      if (event.includes(eventName)) {
        return item;
      }
    });

    const tournaData = tournaments.filter((item) => {
      const { tournament } = item;
      if (tournament.description.includes(eventName)) {
        return item;
      }
    });

    const racesData = races.filter((item) => {
      const { tournament } = item;
      if (tournament.tournamentEvent.includes(eventName)) {
        return item;
      }
    });

    const userData = users.filter((user) => {
      if (user.assignEvent == eventName || user.sportsEvent == eventName) {
        return user;
      }
    });

    if (collegeNameData.length >= 1) {
      delegateData.map((user) => {
        deleteCollegeName(user.id);
      });
    }

    if (userData.length >= 1) {
      userData.map((user) => {
        deleteUser(user.id);
      });
    }

    if (tournaData.length >= 1) {
      tournaData.map((tournament) => {
        deleteTournament(tournament);
      });
    }

    if (racesData.length >= 1) {
      racesData.map((tournament) => {
        deleteRace(tournament.id);
      });
    }

    if (tallyData.length >= 1) {
      tallyData.map((item) => {
        deleteTally(item.id);
      });
    }

    deleteEventName(selectedEvent.id);

    setDeleteModal(false);
  };

  useEffect(() => {
    getRaces(setRaces);
  }, []);

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleUpload}
        title="Add Picture Modal"
        openModal={addPicModal}
        handleClose={() => setAddPicModal(false)}
      >
        {loading && (
          <div className="flex justify-center items-center h-[5rem]">
            <Spinner size={"lg"} />
          </div>
        )}
        {!loading && (
          <div className="container p-10">
            <TmsInput
              onChange={handleImageChange}
              type={"file"}
              accept=".jpg,image/jpeg"
            />
          </div>
        )}
      </TmsModal>
      <ConfirmationModals
        title={"Are you sure to delete this event name?"}
        handleSubmit={handleDeleteEvent}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <ConfirmationModals
        title={"Are you sure to delete this carousel picture?"}
        handleSubmit={() => {
          deleteCarouselPic(selectedCarousel);
          setDeleteCarouselModal(false);
        }}
        openModal={deleteCarouselModal}
        handleClose={() => setDeleteCarouselModal(false)}
      />

      <ConfirmationModals
        title={"Are you sure to delete this college name?"}
        handleSubmit={() => {
          deleteCollegeName(selectedCollegeName);
          setCollegeDeleteModal(false);
        }}
        openModal={collegeDeleteModal}
        handleClose={() => setCollegeDeleteModal(false)}
      />

      {/* Event Name Modal */}
      <TmsModal
        onSubmit={handlUploadEvent}
        title="Add Event Modal"
        openModal={addEventModal}
        handleClose={() => setAddEventModal(false)}
      >
        <div className="p-10">
          <h1 className="font-bold">Enter your event name</h1>
          <TmsInput
            onChange={(event) => setEventName(event.target.value)}
            type={"text"}
          />
        </div>
      </TmsModal>

      {/* College Name Modal */}
      <TmsModal
        onSubmit={handleUploadCollege}
        title="Add Delegates"
        openModal={addCollegeModal}
        handleClose={() => setAddCollegeModal(false)}
      >
        <div className="p-10">
          <h1 className="font-bold">Enter your delegate name:</h1>
          <TmsInput
            onChange={(event) => setCollegeName(event.target.value)}
            type={"text"}
          />
          <h1 className="font-bold mt-5">Enter event name:</h1>

          <TmsSelect
            disable={currentAdmin?.role == "Event Admin"}
            onChange={(event) => setSelectedEventName(event.target.value)}
            dark
            data={
              currentAdmin?.role == "Master Admin"
                ? ["Select Event", ...formatEventNames]
                : [currentAdmin?.sportsEvent]
            }
          />
        </div>
      </TmsModal>

      <div className="container mx-auto mt-10">
        <div className="flex flex-wrap mb-6">
          {/* Users Card */}
          <motion.div
            onClick={() => {
              navigation("/admin/users");
            }}
            className="bg-gray-800 mx-3 basis-full my-3 md:basis-3/12 px-3 text-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <h4 className="text-2xl font-bold">Users</h4>
              <p>
                {currentAdmin.role == "Master Admin"
                  ? activeUsers?.length
                  : activeUsersEvent?.length}
              </p>
            </div>
            <Badge color="info" size={"lg"}>
              Active Users
            </Badge>
          </motion.div>

          {/* Tournaments Card */}
          <motion.div
            className="bg-gray-800 mx-3 basis-full my-3 md:basis-3/12 px-3 text-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h4 className="text-2xl font-bold">Tournaments</h4>
              <p>{tournaments.length}</p>
            </div>
            <Badge color="info" size={"lg"}>
              On Going Tournaments
            </Badge>
          </motion.div>
        </div>

        <Tabs className="mx-3" aria-label="Default tabs" variant="default">
          {currentAdmin?.role == "Master Admin" && (
            <Tabs.Item active title="Carousel">
              <motion.div
                className="wrapper mx-10 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="header w-full flex justify-between items-center">
                  <h1 className="text-white text-lg  md:text-4xl font-bold">
                    Home Page Carousel Pictures
                  </h1>
                  <Button onClick={() => setAddPicModal(true)}>
                    Add Picture
                  </Button>
                </div>
                <div className="flex mt-5 flex-wrap">
                  {data?.map((pic) => {
                    return (
                      <motion.div
                        key={pic.id}
                        className="relative basis-full md:basis-3/12 my-3 flex items-center justify-center" // Set the parent div to relative
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <img
                          className="rounded-md shadow-lg"
                          style={{
                            width: 300,
                            height: 250,
                            objectFit: "cover",
                          }}
                          src={pic.url}
                          alt=""
                        />
                        <Button
                          className="absolute top-2 right-10" // Position the button absolutely
                          color={"failure"}
                          onClick={() => {
                            setDeleteCarouselModal(true);
                            setSelectedCarousel(pic.id);
                          }}
                        >
                          <HiOutlineTrash />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </Tabs.Item>
          )}
          {currentAdmin?.role == "Master Admin" && (
            <Tabs.Item title="Event Name">
              <motion.div
                className="wrapper mx-10 mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="header w-full flex justify-between items-center mb-5">
                  <h1 className="text-white text-4xl font-bold">Event Names</h1>
                  <Button
                    onClick={() => setAddEventModal(true)}
                    color={"success"}
                  >
                    Add Event
                  </Button>
                </div>
                <table className="min-w-full bg-gray-800 rounded-md shadow-md">
                  <thead>
                    <tr className="text-white">
                      <th className="py-3 px-4 text-left">Event Name</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventNameData?.map((event) => (
                      <motion.tr
                        key={event.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <td className="text-dark py-3 px-4 text-white text-3xl font-bold">
                          <div className="flex items-center justify-start">
                            {event.eventName}
                            <Badge
                              color={
                                event.status == "complete" ? "success" : "light"
                              }
                              className="ml-5"
                            >
                              {event.status ? event.status : "Active - Ongoing"}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right items-center flex justify-center">
                          <Button
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedEvent(event);
                            }}
                            color={"failure"}
                            className="ml-2"
                          >
                            <HiOutlineTrash />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </Tabs.Item>
          )}
          <Tabs.Item title="Delegates">
            <motion.div
              className="wrapper mx-10 mt-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="header w-full flex justify-between items-center mb-5">
                <h1 className="text-white text-4xl font-bold">Delegates</h1>
                {!currentEvent?.status && (
                  <Button
                    onClick={() => setAddCollegeModal(true)}
                    color={"success"}
                  >
                    Add Delegates
                  </Button>
                )}
              </div>

              {currentAdmin.role == "Master Admin" && (
                <div className="flex">
                  <TmsSelect
                    onChange={(event) =>
                      setSelectedEventFilter(event.target.value)
                    }
                    dark
                    label={"Select Event Name"}
                    data={["all", ...formatEventNames]}
                  />
                </div>
              )}

              <table className="min-w-full bg-gray-800 rounded-md shadow-md mt-5 mb-20">
                <thead>
                  <tr className="text-white">
                    <th className="py-3 px-4 text-left">Delegates</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCollegeName.map((college) => (
                    <motion.tr
                      key={college.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <td className="text-dark py-3 px-4 text-white">
                        <div className="flex justify-start items-center">
                          <h1 className="text-3xl font-bold">
                            {college.collegeName}
                          </h1>
                          <Badge className="ml-3">{college.event}</Badge>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right flex items-center justify-center">
                        {!currentEvent?.status && (
                          <Button
                            onClick={() => {
                              setCollegeDeleteModal(true);
                              setSelectedCollegeName(college.id);
                            }}
                            color={"failure"}
                            className="ml-2"
                          >
                            <HiOutlineTrash />
                          </Button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </Tabs.Item>

          {currentAdmin?.role == "Event Admin" && (
            <Tabs.Item title="Point System">
              <PointSystem />
            </Tabs.Item>
          )}
          {currentAdmin?.role == "Event Admin" && (
            <Tabs.Item title={currentAdmin?.sportsEvent + " " + "Tally"}>
              <TallyTableEvent />
            </Tabs.Item>
          )}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
