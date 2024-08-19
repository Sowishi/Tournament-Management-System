import { Button, Toast } from "flowbite-react";
import Steps from "../components/steps";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import TmsSelect from "../components/tmsSelect";
import useAddUser from "../hooks/useAddUser";
import { Link } from "react-router-dom";

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
    sportsInfo: "Provincial Meet",
    collegeName: "",
    position: "Student",
  });

  const { addUser } = useAddUser();

  const handleChange = (event) => {
    const { value, name } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = () => {
    addUser(forms);
    setSteps(3);
  };

  function areAllFieldsFilled() {
    for (const key in forms) {
      if (forms.hasOwnProperty(key)) {
        // Check if the field has a length property and is more than 1
        if (forms[key].length <= 1) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <AuthLayout hideHeader={true}>
      <div className="wrapper">
        <form action="">
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
                <Button onClick={() => setSteps(2)} gradientMonochrome="info">
                  NEXT
                </Button>
              </div>
            </form>
          )}
          {steps == 2 && (
            <form action="">
              <div className="wrapper mb-3">
                <h1 className="text-white text-lg font-bold">
                  Sport Information{" "}
                </h1>
                <TmsSelect
                  name="sportsInfo"
                  onChange={handleChange}
                  label={"Sports Information"}
                  data={["Provincial Meet", "RSCUAA", "Bicol Meet"]}
                />{" "}
              </div>
              <div className="wrapper">
                <h1 className="text-white text-lg font-bold">
                  Colleges/Institutions
                </h1>
                <TmsInput
                  name="collegeName"
                  onChange={handleChange}
                  placeHolder={"Name of school/Institution"}
                  label={"College Name"}
                />
                <TmsSelect
                  name="position"
                  onChange={handleChange}
                  label={"Position"}
                  data={["Student", "Faculty", "Coach", "Others"]}
                />{" "}
              </div>

              <div className="flex justify-end items-center mt-3">
                <Button
                  disabled={!areAllFieldsFilled()}
                  gradientMonochrome="info"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          )}
          {steps == 3 && (
            <div className="wrapper flex  flex-col justify-center items-center h-52">
              <h1 className="text-white text-3xl font-bold">
                Registration Completed ✅
              </h1>
              <Link to="/login">
                <Button className="mt-5">Login Now!</Button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default Registration;
