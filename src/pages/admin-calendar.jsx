import { Calendar, momentLocalizer } from "react-big-calendar";
import AdminLayout from "../layout/adminLayout";
import moment from "moment";

const AdminCalendar = () => {
  const localizer = momentLocalizer(moment);

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
    <AdminLayout>
      <Calendar
        className="mx-5 bg-white rounded p-6"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </AdminLayout>
  );
};

export default AdminCalendar;
