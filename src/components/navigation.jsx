import { Button, Dropdown } from "flowbite-react";

const Navigation = () => {
  return (
    <div className="navs w-100 bg-white">
      <Button.Group className="mx-3">
        <Button color="gray">Home</Button>
        <Dropdown color={"gray"} label="Events">
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Button color="gray">Calendar</Button>
        <Button color="gray">Participant</Button>
      </Button.Group>
    </div>
  );
};

export default Navigation;
