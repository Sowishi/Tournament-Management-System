import { Button } from "flowbite-react";
import Header from "./components/header";
import { TMSCarousel } from "./components/carousel";
import Landing from "./pages/landing";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
