import { Button } from "flowbite-react";
import Header from "./components/header";
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
import AdminTournament from "./pages/admin-tournaments";
import ViewTournament from "./pages/view-tournament";
import SystemLog from "./pages/system-log";
import Overwrite from "./pages/overwrite";

import AdminTournamentManger from "./pages/admin-tournament-manager";
import AdminReports from "./pages/admin-reports";
import ViewReports from "./pages/viewReports";
import SelectTournament from "./pages/selectTournament";
import AdminTimeTrial from "./pages/admin-time-trial";
import ViewTimeTrial from "./pages/view-time-trial";

const App = () => {
  const { currentUser, guest, currentAdmin } = useStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
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
        {/* //Admin */}
        <Route
          path="/admin/home"
          element={currentAdmin ? <AdminHome /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={currentAdmin ? <AdminUsers /> : <Login />}
        />
        <Route
          path="/admin/admins"
          element={currentAdmin ? <AdminAdmins /> : <Login />}
        />{" "}
        <Route
          path="/admin/calendar"
          element={currentAdmin ? <AdminCalendar /> : <Login />}
        />
        <Route
          path="/admin/tournament"
          element={currentAdmin ? <AdminTournament /> : <Login />}
        />
        <Route
          path="/admin/time-trial"
          element={currentAdmin ? <AdminTimeTrial /> : <Login />}
        />
        <Route
          path="/admin/tournament-manager"
          element={currentAdmin ? <AdminTournamentManger /> : <Login />}
        />
        <Route
          path="/admin/system-log"
          element={currentAdmin ? <SystemLog /> : <Login />}
        />
        <Route
          path="/admin/overwrite"
          element={currentAdmin ? <Overwrite /> : <Login />}
        />
        <Route
          path="/admin/reports"
          element={currentAdmin ? <AdminReports /> : <Login />}
        />
        <Route
          path="/admin/select-tournament"
          element={currentAdmin ? <SelectTournament /> : <Login />}
        />
        <Route
          path="/admin/reports/:id"
          element={currentAdmin ? <ViewReports /> : <Login />}
        />
        <Route
          path="/tournament/:id"
          element={currentAdmin || currentUser ? <ViewTournament /> : <Login />}
        />
        <Route
          path="/time-trial/:id"
          element={currentAdmin || currentUser ? <ViewTimeTrial /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default App;
