import { useEffect, useState } from "react";
import { TMSCarousel } from "../components/carousel";
import Header from "../components/header";
import LoadingScreen from "../components/loadingScreen";
import DefaultLayout from "../layout/defaultLayout";
import { motion } from "framer-motion";
import Title from "../components/title";
import { Button } from "flowbite-react";

//  <div className="header flex m-5">
//       <div className="wrapper ml-10 flex">
//         <TmsSelect data={["Select Tournaments", "Bicol Meet"]} />
//         <div className="mx-3">
//           <TmsSelect data={["Select Category"]} />
//         </div>
//         <TmsSelect data={["Default"]} />
//       </div>
//     </div>
//     <SingleElimination teams={teams} />

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DefaultLayout>
          <div className="flex  mx-10">
            <div className="basis-5/12 flex justify-center items-center">
              <div className="wrapper flex flex-col justify-center items-center">
                <h1 className="uppercase text-white text-4xl text-center font-bold">
                  Web-based tournament management system
                </h1>
                <Button className="mt-5">Learn more about us</Button>
              </div>
            </div>
            <div className="basis-7/12">
              <div className="container mx-auto h-[30rem] flex justify-center items-center">
                <TMSCarousel />
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default Landing;
