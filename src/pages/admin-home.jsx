import { Badge, Button, ListGroup, Spinner } from "flowbite-react";
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

  return (
    <AdminLayout>
      <TmsModal
        onSubmit={handleUpload}
        title="Add Picture Modal"
        openModal={addPicModal}
        handleClose={() => setAddPicModal(false)}
      >
        {loading && (
          <>
            <div className="flex justify-center items-center h-[5rem]">
              <Spinner size={"lg"} />
            </div>
          </>
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
      <div className="wrapper mx-10 mt-10">
        <div className="header w-full flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold">
            Home Page Carousel Pictures
          </h1>
          <Button onClick={() => setAddPicModal(true)}>Add Picture</Button>
        </div>
        <div className="flex mt-5 flex-wrap">
          {data?.map((pic) => {
            return (
              <div key={pic.id} className="basis-3/12 my-3">
                <div className="wrapper flex flex-col justify-center items-center">
                  <img
                    className="rounded-md"
                    style={{ width: 300, height: 250, objectFit: "cover" }}
                    src={pic.url}
                    alt=""
                  />
                  <Button
                    style={{ marginTop: 10 }}
                    color={"failure"}
                    onClick={() => {
                      setSelectedCarousel(pic.id);
                      setDeleteCarouselModal(true);
                    }}
                  >
                    {" "}
                    <HiOutlineTrash className="mr-2 h-5 w-5" />
                    Delete Picture
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="wrapper mx-10 mt-10 pb-20">
        <div className="header w-full flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold">Events Name</h1>
          <Button onClick={() => setAddEventModal(true)}>Add Event</Button>
        </div>{" "}
        <ListGroup className="w-full mt-10">
          {eventNameData?.map((event) => {
            return (
              <ListGroup.Item key={event.id}>
                <Button
                  onClick={() => {
                    setSelectedEvent(event.id);
                    setDeleteModal(true);
                  }}
                  className="ml-10"
                  color={"failure"}
                >
                  <HiOutlineTrash className="mr-2 h-5 w-5" />
                  Delete
                </Button>
                <div className="ml-10">
                  <h1 className="text-lg">{event.eventName} </h1>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <div className="wrapper mx-10 mt-10 pb-20">
        <div className="header w-full flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold">College Names</h1>
          <Button onClick={() => setAddCollegeModal(true)}>Add College</Button>
        </div>{" "}
        <ListGroup className="w-full mt-10">
          {collegeNameData?.map((event) => {
            return (
              <ListGroup.Item key={event.id}>
                <Button
                  onClick={() => {
                    setSelectedCollegeName(event.id);
                    setCollegeDeleteModal(true);
                  }}
                  className="ml-10"
                  color={"failure"}
                >
                  <HiOutlineTrash className="mr-2 h-5 w-5" />
                  Delete
                </Button>
                <div className="ml-10 flex justify-start items-center">
                  <h1 className="text-lg">{event.collegeName} </h1>
                  <Badge className="ml-3">{event.event}</Badge>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
