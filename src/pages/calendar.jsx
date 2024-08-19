import DefaultLayout from "../layout/defaultLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import "react-big-calendar/lib/css/react-big-calendar.css";

const TMSCalendar = () => {
  const events = [
    {
      id: 1,
      title: "Meeting with Team",
      start: new Date(2024, 7, 20, 10, 0), // August 20, 2024, 10:00 AM
      end: new Date(2024, 7, 20, 12, 0), // August 20, 2024, 12:00 PM
    },

    {
      id: 2,
      title: "Doctor Appointment",
      start: new Date(2024, 7, 21, 14, 0), // August 21, 2024, 2:00 PM
      end: new Date(2024, 7, 21, 15, 0), // August 21, 2024, 3:00 PM
    },
  ];
  return (
    <DefaultLayout>
      <div className="container mx-auto p-5">
        <h1 className="font-bold text-4xl text-white my-5 mb-10 text-center uppercase">
          Events Calendar
        </h1>
        <Calendar
          className="mx-5 bg-white rounded p-6"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </DefaultLayout>
  );
};

export default TMSCalendar;
