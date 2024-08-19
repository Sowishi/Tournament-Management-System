import { TMSCarousel } from "../components/carousel";
import Header from "../components/header";
import DefaultLayout from "../layout/defaultLayout";

const Landing = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto h-[30rem] flex justify-center items-center">
        <TMSCarousel />
      </div>
    </DefaultLayout>
  );
};

export default Landing;
