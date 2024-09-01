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
import Events from "./pages/events";
import Participants from "./pages/participants";
import Tally from "./pages/tally";
import FAQ from "./pages/faqs";
import About from "./pages/about";
import SuperLanding from "./pages/superLanding";
import AdminHome from "./pages/admin-home";
import AdminUsers from "./pages/admin-users";
import AdminAdmins from "./pages/admin-admins";
import AdminLogin from "./pages/admin-login";
import { useStore } from "./zustand/store";
import AdminCalendar from "./pages/admin-calendar";
import User from "./pages/user";

const App = () => {
  const { currentUser } = useStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<SuperLanding />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/calendar" element={<TMSCalendar />} />
        <Route path="/events" element={<Events />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/tally" element={<Tally />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />{" "}
        <Route path="/user" element={currentUser ? <User /> : <Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/home"
          element={currentUser ? <AdminHome /> : <AdminLogin />}
        />
        <Route
          path="/admin/users"
          element={currentUser ? <AdminUsers /> : <AdminLogin />}
        />
        <Route
          path="/admin/admins"
          element={currentUser ? <AdminAdmins /> : <AdminLogin />}
        />{" "}
        <Route
          path="/admin/calendar"
          element={currentUser ? <AdminCalendar /> : <AdminLogin />}
        />
      </Routes>
    </>
  );
};

export default App;
