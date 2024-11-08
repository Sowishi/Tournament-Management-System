import { Badge, Button, ListGroup, Spinner, Tabs } from "flowbite-react";
import AdminLayout from "../layout/adminLayout";
import { useState } from "react";
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
  const [selectedEventFilter, setSelectedEventFilter] = useState("all");

  // Hooks
  const { addCarouselPic } = useAddCarouselPic();
  const { addEventName } = useAddEventName();
  const { data } = useGetCarouselPic();
  const { data: eventNameData } = useGetEventName();
  const { deleteCarouselPic } = useDeleteCarouselPic();
  const { deleteEventName } = useDeleteEventName();
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
    addEventName(eventName);
    setAddEventModal(false);
    toast.success("Successfully Added Event Name");
  };

  const handleUploadCollege = () => {
    addCollegeName({ collegeName, selectedEventName });
    setAddCollegeModal(false);
    toast.success("Successfully Added College Name");
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
            <TmsInput onChange={handleImageChange} type={"file"} />
          </div>
        )}
      </TmsModal>
      <ConfirmationModals
        title={"Are you sure to delete this event name?"}
        handleSubmit={() => {
          deleteEventName(selectedEvent);
          setDeleteModal(false);
        }}
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
        title="Add College Name Modal"
        openModal={addCollegeModal}
        handleClose={() => setAddCollegeModal(false)}
      >
        <div className="p-10">
          <h1 className="font-bold">Enter your college name</h1>
          <TmsInput
            onChange={(event) => setCollegeName(event.target.value)}
            type={"text"}
          />
          <TmsSelect
            onChange={(event) => setSelectedEventName(event.target.value)}
            dark
            label={"Enter Event Name"}
            data={["Please Select Event Name", ...formatEventNames]}
          />
        </div>
      </TmsModal>

      <div className="container mx-auto mt-10">
        <Tabs aria-label="Default tabs" variant="default">
          <Tabs.Item active title="Dashboard">
            <motion.div
              className="wrapper mx-10 mt-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="header w-full flex justify-between items-center">
                <h1 className="text-white text-4xl font-bold">
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
                      className="relative basis-3/12 my-3 flex items-center justify-center" // Set the parent div to relative
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <img
                        className="rounded-md shadow-lg"
                        style={{ width: 300, height: 250, objectFit: "cover" }}
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
                      <td className="text-dark py-3 px-4 text-white">
                        {event.eventName}
                      </td>
                      <td className="py-3 px-4 text-right items-center flex justify-center">
                        <Button
                          onClick={() => {
                            setDeleteModal(true);
                            setSelectedEvent(event.id);
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

          <Tabs.Item title="College Names">
            <motion.div
              className="wrapper mx-10 mt-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="header w-full flex justify-between items-center mb-5">
                <h1 className="text-white text-4xl font-bold">College Names</h1>
                <Button
                  onClick={() => setAddCollegeModal(true)}
                  color={"success"}
                >
                  Add College
                </Button>
              </div>
              <TmsSelect
                onChange={(event) => setSelectedEventFilter(event.target.value)}
                dark
                label={"Select Event Name"}
                data={["all", ...formatEventNames]}
              />
              <table className="min-w-full bg-gray-800 rounded-md shadow-md mt-5">
                <thead>
                  <tr className="text-white">
                    <th className="py-3 px-4 text-left">College Name</th>
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
                        {college.collegeName}
                      </td>
                      <td className="py-3 px-4 text-right flex items-center justify-center">
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
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </Tabs.Item>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
