import { Button } from "flowbite-react";
import Header from "./components/header";
import { TMSCarousel } from "./components/carousel";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <TMSCarousel />
    </div>
  );
};

export default App;
