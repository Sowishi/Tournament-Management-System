import { Button, Toast } from "flowbite-react";
import Steps from "../components/steps";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import TmsSelect from "../components/tmsSelect";
import useAddUser from "../hooks/useAddUser";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { toast } from "react-toastify";

const Registration = () => {
  const [forms, setForms] = useState({
    fullName: "",
    birthDate: "",
    gender: "Male",
    email: "",
    contactNumber: "",
    address: "",
    sportsInfo: "Provincial Meet",
    collegeName: "",
    position: "Student",
    password: "",
    confirmPassword: "",
  });

  const { addUser } = useAddUser();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (forms.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (forms.contactNumber.length !== 10 || forms.contactNumber[0] !== "9") {
      toast.error("Phone number must be 10 digits long and start with '9'");
      return;
    }
    if (forms.password !== forms.confirmPassword) {
      toast.error("Password does not match");
      return;
    } else {
      addUser(forms);
      toast.success("Successfully Registered");
      navigate("/login");
    }
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
      <div
        className="wrapper p-14 m-20 w-full rounded-lg"
        style={{
          background:
            "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
        }}
      >
        <div className="text-center flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold mb-3 mr-5">
            Registration
          </h1>
          <img src={logo} width={100} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl">Personal Details</h1>
          <div className="flex">
            <div className="basis-6/12 mx-3">
              <TmsInput
                name="fullName"
                onChange={handleChange}
                value={forms.fullName}
                placeHolder={"Full Name"}
                label={"Full Name"}
              />
              <TmsInput
                onChange={handleChange}
                name={"birthDate"}
                type={"date"}
                placeHolder={"Birthdate"}
                label={"Birth Date"}
              />
              <TmsSelect
                name="gender"
                onChange={handleChange}
                label={"Gender"}
                data={["Male", "Female"]}
              />
            </div>
            <div className="basis-6/12 mx-3">
              <TmsInput
                type={"email"}
                name={"email"}
                onChange={handleChange}
                placeHolder={"Email"}
                label={"Email"}
              />
              <TmsInput
                addOn="+63"
                onChange={handleChange}
                name={"contactNumber"}
                placeHolder={"Contact Number"}
                label={"Contact Number"}
              />{" "}
              <TmsInput
                name={"address"}
                onChange={handleChange}
                placeHolder={"Address"}
                label={"Address"}
              />{" "}
            </div>
          </div>
          <h1 className="text-white font-bold text-3xl mt-10">
            Sports Information
          </h1>
          <div className="flex mx-3 flex-col">
            <TmsSelect
              name="sportsInfo"
              onChange={handleChange}
              label={"Sports Information"}
              data={["Provincial Meet", "RSCUAA", "Bicol Meet"]}
            />
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
            />
          </div>

          <div className="flex">
            <div className="basis-6/12 mx-3">
              <TmsInput
                type={"password"}
                name={"password"}
                onChange={handleChange}
                placeHolder={"Password"}
                label={"Password"}
              />
            </div>
            <div className="basis-6/12 mx-3">
              <TmsInput
                type={"password"}
                name={"confirmPassword"}
                onChange={handleChange}
                placeHolder={"Confirm Password"}
                label={"Confirm Password"}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button
              className="w-full mx-3 py-4"
              disabled={!areAllFieldsFilled()}
              gradientMonochrome="info"
              type="submit"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Registration;
