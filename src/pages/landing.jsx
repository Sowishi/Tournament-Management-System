import { useEffect, useState } from "react";
import { TMSCarousel } from "../components/carousel";
import Header from "../components/header";
import LoadingScreen from "../components/loadingScreen";
import DefaultLayout from "../layout/defaultLayout";
import { motion } from "framer-motion";
import Title from "../components/title";

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
          <Title title={"Announcement"} />

          <div className="container mx-auto h-[30rem] flex justify-center items-center">
            <TMSCarousel />
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default Landing;
