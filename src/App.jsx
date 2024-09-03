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
  const { currentUser, guest } = useStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<SuperLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/home"
          element={currentUser || guest ? <Landing /> : <Login />}
        />
        <Route
          path="/calendar"
          element={currentUser || guest ? <TMSCalendar /> : <Login />}
        />
        <Route
          path="/events"
          element={currentUser || guest ? <Events /> : <Login />}
        />
        <Route
          path="/participants"
          element={currentUser || guest ? <Participants /> : <Login />}
        />
        <Route
          path="/tally"
          element={currentUser || guest ? <Tally /> : <Login />}
        />
        <Route
          path="/faq"
          element={currentUser || guest ? <FAQ /> : <Login />}
        />
        <Route
          path="/about"
          element={currentUser || guest ? <About /> : <Login />}
        />{" "}
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
