import { Button, Dropdown } from "flowbite-react";
import { useStore } from "../zustand/store";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { setCurrentEvent, currentEvent } = useStore();
  return (
    <div className="navs w-100 bg-white py-1">
      <Button.Group className="mx-3">
        <a href="/">
          <Button color="gray">Home</Button>
        </a>
        <Dropdown color={"gray"} label={currentEvent ? currentEvent : "Events"}>
          {" "}
          <Dropdown.Item onClick={() => setCurrentEvent("RSCUAA")}>
            RSCUAA
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCurrentEvent("Provincial Meet")}>
            {" "}
            Provincial Meet
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCurrentEvent("Bicol Meet")}>
            Bicol Meet
          </Dropdown.Item>
        </Dropdown>
        {!currentEvent && (
          <>
            <Button color="gray">FAQs</Button>
            <Button color="gray">About Us</Button>
          </>
        )}
        {currentEvent && (
          <>
            <Link to={"/calendar"}>
              <Button color="gray">Calendar</Button>
            </Link>
            <Link to={"/events"}>
              <Button color="gray">Events</Button>
            </Link>
            <Link to={"/participants"}>
              <Button color="gray">Participants</Button>
            </Link>
            <Link to={"/tally"}>
              <Button color="gray">Tally</Button>
            </Link>
          </>
        )}
      </Button.Group>
    </div>
  );
};

export default Navigation;
