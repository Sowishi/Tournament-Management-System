import { useEffect, useState } from "react";
import { TMSCarousel } from "../components/carousel";
import LoadingScreen from "../components/loadingScreen";
import DefaultLayout from "../layout/defaultLayout";
import { Badge, Button } from "flowbite-react";
import { useStore } from "../zustand/store";
import { useNavigate } from "react-router-dom";

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
  const { setCurrentEvent, currentEvent, currentUser, setCurrentUser } =
    useStore();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigation = useNavigate();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <DefaultLayout>
          <div className="container mx-auto mt-10">
            <div className="flex">
              <div className="basis-7/12 p-10">
                <div className="container mx-auto h-[30rem] flex justify-center items-center flex-col">
                  <TMSCarousel />
                </div>
              </div>
              <div className="basis-5/12 flex justify-center items-center">
                <div className="shadow-xl p-10 mx-5">
                  <h1 className="font-bold text-3xl">
                    Tournament Management System
                  </h1>
                  <p className="text-gray-400 my-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptatibus asperiores, ducimus porro hic dolore quas vel
                    vitae incidunt aspernatur natus laudantium accusamus
                    necessitatibus dicta. Incidunt at nihil vel aspernatur quia!
                  </p>
                  <Button
                    onClick={() => navigation("/events")}
                    className="mt-5 w-full py-3"
                    gradientDuoTone="cyanToBlue"
                  >
                    Learn More About Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default Landing;
