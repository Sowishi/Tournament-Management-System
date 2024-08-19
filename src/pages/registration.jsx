import { Button } from "flowbite-react";
import Steps from "../components/steps";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import TmsSelect from "../components/tmsSelect";

const Registration = () => {
  const [steps, setSteps] = useState(1);
  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
    birthDate: "",
    gender: "Male",
    email: "",
    contactNumber: "",
    nationality: "",
    address: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  console.log(forms);
  return (
    <AuthLayout hideHeader={true}>
      <div className="wrapper">
        <h1 className="text-white text-3xl font-bold mb-3">Registration</h1>
        <Steps steps={steps} setSteps={setSteps} />
        {steps == 1 && (
          <form action="">
            <div className="flex ">
              <div className="basis-4/12 mx-2">
                <TmsInput
                  name="firstName"
                  onChange={handleChange}
                  value={forms.firstName}
                  placeHolder={"First Name"}
                  label={"First Name"}
                />
                <TmsInput
                  onChange={handleChange}
                  name={"birthDate"}
                  type={"date"}
                  placeHolder={"Birthdate"}
                  label={"Birth Date"}
                />
                <TmsInput
                  onChange={handleChange}
                  name={"contactNumber"}
                  placeHolder={"Contact Number"}
                  label={"Contact Number"}
                />{" "}
              </div>
              <div className="basis-4/12 mx-2">
                <TmsInput
                  name={"lastName"}
                  onChange={handleChange}
                  value={forms.lastName}
                  placeHolder={"Last Name"}
                  label={"Last Name"}
                />
                <TmsSelect
                  name="gender"
                  onChange={handleChange}
                  label={"Gender"}
                  data={["Male", "Female"]}
                />
                <TmsInput
                  name={"nationality"}
                  onChange={handleChange}
                  placeHolder={"Nationality"}
                  label={"Nationality"}
                />{" "}
              </div>
              <div className="basis-4/12 mx-2">
                <TmsInput
                  name={"middleInitial"}
                  onChange={handleChange}
                  value={forms.middleInitial}
                  placeHolder={"Middle Initial"}
                  label={"Middle Initial"}
                />
                <TmsInput
                  name={"email"}
                  onChange={handleChange}
                  placeHolder={"Email"}
                  label={"Email"}
                />
              </div>
            </div>
            <div className="mx-2 w-full">
              <TmsInput
                name={"address"}
                onChange={handleChange}
                placeHolder={"Address"}
                label={"Address"}
              />{" "}
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
              <Button gradientMonochrome="info">SUBMIT</Button>
            </div>
          </form>
        )}
        {steps == 3 && (
          <div className="wrapper flex justify-center items-center h-52">
            <h1 className="text-white text-3xl font-bold">
              Registration Completed ✅
            </h1>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Registration;
