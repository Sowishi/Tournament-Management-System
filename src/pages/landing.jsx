import { TMSCarousel } from "../components/carousel";
import Header from "../components/header";
import DefaultLayout from "../layout/defaultLayout";

const Landing = () => {
  return (
    <DefaultLayout>
      <div className="wrapper flex jsutify-center items-center  flex-col mb-5">
        <h1 className="font-bold text-white text-5xl m-5 text-center">
          Announcement
        </h1>
        <div
          style={{ background: "#FFBD59" }}
          className="line h-[5px] w-[250px]"
        ></div>
      </div>

      <div className="container mx-auto h-[30rem] flex justify-center items-center">
        <TMSCarousel />
      </div>
    </DefaultLayout>
  );
};

export default Landing;
