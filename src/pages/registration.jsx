import { Button } from "flowbite-react";
import Steps from "../components/steps";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import TmsSelect from "../components/tmsSelect";

const Registration = () => {
  const [steps, setSteps] = useState(1);
  return (
    <AuthLayout hideHeader={true}>
      <div className="wrapper">
        <h1 className="text-white text-3xl font-bold mb-3">Registration</h1>
        <Steps steps={steps} setSteps={setSteps} />
        {steps == 1 && (
          <form action="">
            <div className="flex ">
              <div className="basis-4/12 mx-2">
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
              </div>
              <div className="basis-4/12 mx-2">
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
              </div>
              <div className="basis-4/12 mx-2">
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
                <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
              </div>
            </div>
            <div className="mx-2 w-full">
              <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
            </div>
            <div className="flex justify-end items-center mt-3">
              <Button gradientMonochrome="info">NEXT</Button>
            </div>
          </form>
        )}
        {steps == 2 && (
          <form action="">
            <div className="wrapper mb-3">
              <h1 className="text-white text-lg font-bold">
                Sport Information{" "}
              </h1>
              <TmsSelect />
            </div>
            <div className="wrapper">
              <h1 className="text-white text-lg font-bold">
                Colleges/Institutions
              </h1>
              <TmsSelect />
              <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
              <TmsInput placeHolder={"Last Name"} label={"Last Name"} />
            </div>

            <div className="flex justify-end items-center mt-3">
              <Button gradientMonochrome="info">NEXT</Button>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default Registration;
