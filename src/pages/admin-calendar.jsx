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

const AdminCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [addModal, setAddModal] = useState(false);
  const { data: eventNames } = useGetEventName();
  const [selectedEvent, setSelectedEvent] = useState("RSCUAA");
  const { addCalendar, data, deleteCalendar } = useCrudCalendar();
  const [deleteModal, setDeleteModal] = useState(false);

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
          {data.map((item) => {
            return (
              <div className="wrapperf flex justify-between items-center">
                <div className="wrapper">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <h1>{item.eventName}</h1>
                </div>
                <Button onClick={() => deleteCalendar(item)} color={"failure"}>
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
      <div className="wrapper flex justify-between   items-center mx-12 my-5">
        <TmsSelect
          data={filterEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        />
        <div className="wrapper flex items-center justify-start">
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

      <div className="container mx-auto py-5 ">
        <h1 className="text-white text-3xl mx-5">Calendar: {selectedEvent}</h1>
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
