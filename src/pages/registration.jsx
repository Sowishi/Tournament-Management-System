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
import useGetEventName from "../hooks/useGetEventName";
import useCrudCollegeName from "../hooks/useCrudCollegeName";
import {
  HiOutlineHome,
  HiOutlineQuestionMarkCircle,
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineRss,
  HiOutlineUserGroup,
  HiViewBoards,
  HiOutlineUser,
  HiMail,
} from "react-icons/hi";
const Registration = () => {
  const [forms, setForms] = useState({
    schoolRepresentative: "",
    email: "",
    contact: "",
    sportsEvent: "",
    collegeName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { addUser } = useAddUser();
  const { data: eventNames } = useGetEventName();
  const { data: collegeNames } = useCrudCollegeName();

  const [passwordValidation, setPasswordValidation] = useState("");
  const [phoneValidation, setPhoneValidation] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name == "contact") {
      if (value.length !== 10 || value[0] !== "9") {
        setPhoneValidation(
          "Phone number must be 10 digits long and start with '9'"
        );
      }
      if (value.length == 10 || value[0] == "9") {
        setPhoneValidation(undefined);
      }
    }

    if (name == "password") {
      if (value.length < 8) {
        setPasswordValidation("Password must be at least 8 characters long");
      } else {
        setPasswordValidation(undefined);
      }
    }

    if (name == "confirmPassword") {
      if (value !== forms.password) {
        setPasswordValidation("Password does not match");
      }

      if (value == forms.password) {
        setPasswordValidation(undefined);
      }
    }

    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addUser(forms);
    toast.success("Successfully Registered");
    navigate("/login");
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

  const formatEventNames = eventNames.map((item) => {
    return item.eventName;
  });

  const formatCollegeNames = collegeNames.map((item) => {
    return item.collegeName;
  });

  return (
    <AuthLayout hideHeader={true}>
      <div
        className="wrapper p-14 m-20 w-full rounded-lg"
        style={{
          margin: "0 auto",
          background: "rgba(16, 18, 27, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "10px",
          backdropFilter: "blur(2px)",
          margin: 100,
        }}
      >
        <div className="text-center flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold mb-3 mr-5">
            Registration
          </h1>
          <img src={logo} width={100} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl">SUCS details</h1>
          <div className="flex">
            <div className="basis-full mx-3">
              <TmsInput
                name="schoolRepresentative"
                onChange={handleChange}
                value={forms.schoolRepresentative}
                placeHolder={"SUCs Representative"}
                label={"SUCs Representative"}
              />
              <TmsInput
                onChange={handleChange}
                value={forms.email}
                name={"email"}
                type={"email"}
                placeHolder={"Email"}
                label={"SUCs Email"}
              />
              <TmsInput
                addOn={"+63"}
                onChange={handleChange}
                value={forms.contact}
                name={"contact"}
                placeHolder={"SUCs Contact"}
                label={"SUCs Contact"}
                error={phoneValidation}
              />
            </div>
          </div>
          <h1 className="text-white font-bold text-3xl mt-10">
            Sports Information
          </h1>
          <div className="flex mx-3 flex-col">
            <TmsSelect
              name="sportsEvent"
              onChange={handleChange}
              label={"Sports Information"}
              data={["Please select event name", ...formatEventNames]}
            />
            <TmsSelect
              name="collegeName"
              onChange={handleChange}
              label={"College Name"}
              data={["Please select college name", ...formatCollegeNames]}
            />
          </div>

          <h1 className="text-white font-bold text-3xl mt-10">
            Account Information
          </h1>

          <div className="flex flex-wrap mx-3">
            <div className="basis-full">
              <TmsInput
                onChange={handleChange}
                value={forms.username}
                name={"username"}
                placeHolder={"Username"}
                label={"Username"}
              />
            </div>
            <div className="basis-6/12 pr-5">
              <TmsInput
                type={"password"}
                name={"password"}
                onChange={handleChange}
                placeHolder={"Password"}
                label={"Password"}
                error={passwordValidation}
              />
            </div>
            <div className="basis-6/12">
              <TmsInput
                type={"password"}
                name={"confirmPassword"}
                onChange={handleChange}
                placeHolder={"Confirm Password"}
                label={"Confirm Password"}
                error={passwordValidation}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link to={"/login"} className="w-full mx-3 py-4">
              <Button
                className="w-full py-4"
                gradientMonochrome="success"
                type="submit"
              >
                Back to Login
              </Button>
            </Link>
            <Button
              className="w-full mx-3 py-4"
              gradientMonochrome="info"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Registration;
