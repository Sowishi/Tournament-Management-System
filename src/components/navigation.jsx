import { Button, Dropdown } from "flowbite-react";
import { useStore } from "../zustand/store";

const Navigation = () => {
  const { setCurrentEvent, currentEvent } = useStore();
  return (
    <div className="navs w-100 bg-white">
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
            <Button color="gray">Calendar</Button>
            <Button color="gray">Tournaments</Button>
            <Button color="gray">Tally</Button>
            <Button color="gray">Participants</Button>
          </>
        )}
      </Button.Group>
    </div>
  );
};

export default Navigation;
