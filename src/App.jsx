import { Button } from "flowbite-react";
import Header from "./components/header";
import { TMSCarousel } from "./components/carousel";
import Landing from "./pages/landing";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Forgot from "./pages/forgot";
import Bracket from "./pages/bracket";
import TMSCalendar from "./pages/calendar";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/calendar" element={<TMSCalendar />} />
        <Route path="/bracket" element={<Bracket />} />
      </Routes>
    </>
  );
};

export default App;
