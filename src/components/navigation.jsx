import { Button, Dropdown } from "flowbite-react";
import { useStore } from "../zustand/store";
import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineQuestionMarkCircle,
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineRss,
  HiOutlineUserGroup,
  HiViewBoards,
} from "react-icons/hi";
import useGetEventName from "../hooks/useGetEventName";
const Navigation = () => {
  const { setCurrentEvent, currentEvent } = useStore();
  const { data: eventNameData } = useGetEventName();

  return (
    <div className="navs w-100 bg-white py-1">
      <Button.Group className="mx-3">
        <Link to="/">
          <Button color="grLinky">
            {" "}
            <HiOutlineHome className="mr-2 h-5 w-5" />
            Home
          </Button>
        </Link>
        <Dropdown color={"gray"} label={currentEvent ? currentEvent : "Events"}>
          {eventNameData?.map((event) => {
            return (
              <Dropdown.Item
                key={event.id}
                onClick={() => setCurrentEvent(event.eventName)}
              >
                {event.eventName}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
        {!currentEvent && (
          <>
            <Link to={"/faq"}>
              {" "}
              <Button color="gray">
                <HiOutlineQuestionMarkCircle className="mr-2 h-5 w-5" />
                FAQs
              </Button>
            </Link>

            <Link to={"/about"}>
              <Button color="gray">
                {" "}
                <HiOutlineMap className="mr-2 h-5 w-5" />
                About Us
              </Button>
            </Link>
          </>
        )}
        {currentEvent && (
          <>
            <Link to={"/calendar"}>
              <Button color="gray">
                {" "}
                <HiOutlineCalendar className="mr-2 h-5 w-5" />
                Calendar
              </Button>
            </Link>
            <Link to={"/events"}>
              <Button color="gray">
                {" "}
                <HiOutlineRss className="mr-2 h-5 w-5" />
                Events
              </Button>
            </Link>
            <Link to={"/participants"}>
              <Button color="gray">
                {" "}
                <HiOutlineUserGroup className="mr-2 h-5 w-5" />
                Participants
              </Button>
            </Link>
            <Link to={"/tally"}>
              <Button color="gray">
                {" "}
                <HiViewBoards className="mr-2 h-5 w-5" />
                Tally
              </Button>
            </Link>
          </>
        )}
      </Button.Group>
    </div>
  );
};

export default Navigation;
