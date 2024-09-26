import { Calendar, momentLocalizer } from "react-big-calendar";
import AdminLayout from "../layout/adminLayout";
import moment from "moment";
import { useState } from "react";
import { Button } from "flowbite-react";
import TmsSelect from "../components/tmsSelect";
import useGetEventName from "../hooks/useGetEventName";
import TmsInput from "../components/tmsInput";
import useCrudCalendar from "../hooks/useCrudCalendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TmsModal from "../components/tmsModal";
import ConfirmationModals from "../components/confirmationModal";
import { toast } from "react-toastify";

const AdminCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [addModal, setAddModal] = useState(false);
  const { data: eventNames } = useGetEventName();
  const [selectedEvent, setSelectedEvent] = useState("RSCUAA");
  const { addCalendar, data, deleteCalendar } = useCrudCalendar();
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmationModal, setCofirmationModal] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState();
  const [forms, setForms] = useState({
    title: "",
    start: "",
    end: "",
    eventName: "RSCUAA",
  });

  const filterEvent = eventNames.map((item) => {
    return item.eventName;
  });

  const handleAddCalendar = () => {
    const startDateMoment = moment(forms.start).format("LLL");
    const endDateMoment = moment(forms.end).format("LLL");
    const output = {
      ...forms,
      ["start"]: startDateMoment,
      ["end"]: endDateMoment,
    };
    addCalendar(output);
    setAddModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });
  };

  const filterCalendarData = data.map((item) => {
    if (item.eventName == selectedEvent) {
      return item;
    }
  });

  return (
    <AdminLayout>
      <TmsModal
        hideFooter
        title={"Delete Calendar"}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      >
        <div className="container">
          {data.length <= 0 && (
            <h1 className="text-center text-3xl my-20">
              There's no calendar events yet
            </h1>
          )}
          {data.map((item) => {
            return (
              <div className="wrapperf flex justify-between items-center">
                <div className="wrapper">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <h1>{item.eventName}</h1>
                </div>
                <Button
                  onClick={() => {
                    setCofirmationModal(true);
                    setSelectedCalendar(item);
                  }}
                  color={"failure"}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </TmsModal>
      <TmsModal
        title={"Add Event Name"}
        openModal={addModal}
        handleClose={() => setAddModal(false)}
        onSubmit={handleAddCalendar}
      >
        <div className="container">
          <TmsInput
            name={"title"}
            onChange={handleChange}
            dark={true}
            label={"Title "}
          />
          <div className="wrapper">
            <h1>Start Date</h1>
            <DatePicker
              selected={forms.start}
              showTimeSelect
              onChange={(date) => setForms({ ...forms, ["start"]: date })}
            />
          </div>
          <div className="wrapper">
            <h1>End Date</h1>{" "}
            <DatePicker
              selected={forms.end}
              showTimeSelect
              onChange={(date) => setForms({ ...forms, ["end"]: date })}
            />
          </div>

          <TmsSelect
            label={"Event Name"}
            dark={true}
            name={"eventName"}
            data={filterEvent}
            onChange={handleChange}
          />
        </div>
      </TmsModal>

      <div className="container mx-auto mt-16 flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold mb-5">Calendar</h1>

        <div className="wrapper flex mb-3 py-3">
          {eventNames.map((event) => {
            return (
              <Button
                key={event.id}
                color={selectedEvent == event.eventName ? "info" : "gray"}
                className="mx-3"
                onClick={() => setSelectedEvent(event.eventName)}
              >
                {event.eventName}
              </Button>
            );
          })}
        </div>
        <div className="wrapper flex">
          <Button onClick={() => setAddModal(true)}>Add Calendar</Button>
          <Button
            className="mx-3"
            color={"failure"}
            onClick={() => setDeleteModal(true)}
          >
            Delete Calendar
          </Button>
        </div>
      </div>

      <ConfirmationModals
        title={"Are you sure to delete this calendar event?"}
        handleSubmit={() => {
          deleteCalendar(selectedCalendar);
          setCofirmationModal(false);
          toast.success("Successfully Deleted Calendar");
        }}
        openModal={confirmationModal}
        handleClose={() => setCofirmationModal(false)}
      />

      <div className="container mx-auto py-5 ">
        <Calendar
          views={["month", "agenda"]}
          className="mx-5 bg-white rounded p-6"
          localizer={localizer}
          events={filterCalendarData}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
