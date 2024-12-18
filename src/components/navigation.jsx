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
  HiOutlineUser,
} from "react-icons/hi";
import useGetEventName from "../hooks/useGetEventName";
import { useEffect } from "react";
const Navigation = () => {
  const { setCurrentEvent, currentEvent, currentUser, setCurrentUser } =
    useStore();
  const { data: eventNameData } = useGetEventName();

  useEffect(() => {
    setCurrentEvent(currentUser?.sportsEvent);
  }, []);

  return (
    <div className="navs w-100 bg-white py-1">
      <Button.Group className="mx-3">
        <Link to="/home">
          <Button color="grLinky">
            {" "}
            <HiOutlineHome className="mr-2 h-5 w-5" />
            Home
          </Button>
        </Link>

        {!currentEvent && (
          <>
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
        {currentUser && (
          <>
            <Link to={"/user"}>
              {" "}
              <Button gradientMonochrome="info" className="mx-3">
                <HiOutlineUser className="mr-2 h-5 w-5" />
                User Account
              </Button>
            </Link>
            <Button
              onClick={() => {
                setCurrentUser(null);
                localStorage.removeItem("user");
              }}
              gradientMonochrome="failure"
              type="submit"
            >
              Logout
            </Button>
          </>
        )}
        {!currentUser && (
          <>
            <Link to={"/user"}>
              {" "}
              <Button gradientMonochrome="info" className="mx-3">
                <HiOutlineUser className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
          </>
        )}
      </Button.Group>
    </div>
  );
};

export default Navigation;
