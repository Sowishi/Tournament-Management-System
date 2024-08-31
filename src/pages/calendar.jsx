import DefaultLayout from "../layout/defaultLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import "react-big-calendar/lib/css/react-big-calendar.css";
import Title from "../components/title";
import useCrudCalendar from "../hooks/useCrudCalendar";
import { useStore } from "../zustand/store";

const TMSCalendar = () => {
  const { addCalendar, data } = useCrudCalendar();

  const { currentEvent } = useStore();
  const filterCalendarData = data.map((item) => {
    if (item.eventName == currentEvent) {
      return item;
    }
  });
  return (
    <DefaultLayout>
      <div className="container mx-auto p-5">
        <div className="flex">
          <div className="basis-8/12"></div>
        </div>
        <Title title={"calendar"} />
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
    </DefaultLayout>
  );
};

export default TMSCalendar;
