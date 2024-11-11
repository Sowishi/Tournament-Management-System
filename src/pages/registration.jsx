import { Button, Toast, Tooltip } from "flowbite-react";
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

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
  const [emailValidation, setEmailValidation] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;

    // Phone validation
    if (name === "contact") {
      setPhoneValidation(
        value.length !== 10 || value[0] !== "9"
          ? "Phone number must be 10 digits long and start with '9'"
          : undefined
      );
    }

    // Password validation
    if (name === "password") {
      setPasswordValidation(
        value.length < 8
          ? "Password must be at least 8 characters long"
          : undefined
      );
    }

    // Confirm password validation (only after typing starts)
    if (name === "confirmPassword" && value) {
      setPasswordValidation(
        value !== forms.password ? "Passwords do not match" : undefined
      );
    }

    // Email validation
    if (name === "email") {
      setEmailValidation(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? undefined
          : "Please enter a valid email format"
      );
    }

    setForms({ ...forms, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const colRef = collection(db, "users");
    const q = query(colRef, where("collegeName", "==", forms.collegeName));
    const querySnapshot = await getDocs(q);
    let isDuplicate = false;

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.collegeName === forms.collegeName && data.status === "Approve") {
        toast.error(
          "School/College already exists. Check your account status."
        );
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      addUser(forms);
      toast.success("Successfully Registered");
      navigate("/login");
    }
  };

  function areAllFieldsFilled() {
    return Object.values(forms).every((field) => field.length > 0);
  }

  const formatEventNames = eventNames.map((item) => item.eventName);

  const filterCollegeNames = collegeNames.filter(
    (item) => item.event === forms.sportsEvent
  );

  const formatCollegeNames = filterCollegeNames.map((item) => item.collegeName);

  return (
    <AuthLayout hideHeader={true}>
      <div className="wrapper p-14 m-20 w-full rounded-lg">
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
                placeHolder=""
                label="SUCs Representative"
              />
              <div className="flex flex-col">
                <TmsInput
                  placeHolder="Please enter a valid email address in the format: example@domain.com."
                  onChange={handleChange}
                  value={forms.email}
                  name="email"
                  type="email"
                  label="SUCs Email"
                  error={emailValidation}
                />
              </div>

              <TmsInput
                addOn="+63"
                onChange={handleChange}
                value={forms.contact}
                name="contact"
                placeHolder=""
                label="SUCs Contact"
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
              label="Sports Information"
              data={["Please select event name", ...formatEventNames]}
            />
            {forms.sportsEvent.length >= 1 && (
              <TmsSelect
                name="collegeName"
                onChange={handleChange}
                label="College Name"
                data={["Please select college name", ...formatCollegeNames]}
                disabled={!forms.sportsEvent}
              />
            )}
          </div>

          <h1 className="text-white font-bold text-3xl mt-10">
            Account Information
          </h1>
          <div className="flex flex-wrap mx-3">
            <div className="basis-full">
              <TmsInput
                onChange={handleChange}
                value={forms.username}
                name="username"
                placeHolder=""
                label="Username"
              />
            </div>
            <div className="basis-6/12 pr-5">
              <TmsInput
                type="password"
                name="password"
                onChange={handleChange}
                placeHolder=""
                label="Password"
                error={passwordValidation}
              />
            </div>
            <div className="basis-6/12">
              <TmsInput
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeHolder=""
                label="Confirm Password"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link to="/login" className="w-full mx-3 py-4">
              <Button className="w-full py-4" gradientMonochrome="success">
                Back to Login
              </Button>
            </Link>

            <Button
              className="w-full mx-3 py-4"
              disabled={!areAllFieldsFilled()}
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
