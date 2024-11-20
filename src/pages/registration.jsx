import { Button } from "flowbite-react";
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

  const [errors, setErrors] = useState({});
  const { addUser } = useAddUser();
  const { data: eventNames } = useGetEventName();
  const { data: collegeNames } = useCrudCollegeName();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "contact":
        return value.length !== 10 || value[0] !== "9"
          ? "Phone number must be 10 digits long and start with '9'"
          : null;
      case "password":
        return value.length < 8
          ? "Password must be at least 8 characters long"
          : null;
      case "confirmPassword":
        return value !== forms.password ? "Passwords do not match" : null;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Please enter a valid email format";
      default:
        return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);

    setForms({ ...forms, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(forms).forEach((key) => {
      const error = validateField(key, forms[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const colRef = collection(db, "users");
      const q = query(colRef, where("collegeName", "==", forms.collegeName));
      const querySnapshot = await getDocs(q);

      const isDuplicate = querySnapshot.docs.some(
        (doc) => doc.data().status === "Approve"
      );

      if (isDuplicate) {
        toast.error(
          "School/College already exists. Check your account status."
        );
      } else {
        await addUser(forms);
        toast.success("Successfully Registered");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const areAllFieldsFilled = Object.values(forms).every((field) =>
    field.trim()
  );

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
          <img src={logo} width={100} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl">SUCS details</h1>
          <div className="flex">
            <div className="basis-full mx-3">
              <TmsInput
                name="schoolRepresentative"
                onChange={handleChange}
                value={forms.schoolRepresentative}
                label="SUCs Representative"
              />
              <TmsInput
                name="email"
                type="email"
                onChange={handleChange}
                value={forms.email}
                label="SUCs Email"
                error={errors.email}
              />
              <TmsInput
                addOn="+63"
                name="contact"
                onChange={handleChange}
                value={forms.contact}
                label="SUCs Contact"
                error={errors.contact}
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
            {forms.sportsEvent && (
              <TmsSelect
                name="collegeName"
                onChange={handleChange}
                label="College Name"
                data={["Please select college name", ...formatCollegeNames]}
              />
            )}
          </div>

          <h1 className="text-white font-bold text-3xl mt-10">
            Account Information
          </h1>
          <div className="flex flex-col flex-wrap mx-3">
            <TmsInput
              name="username"
              onChange={handleChange}
              value={forms.username}
              label="Username"
            />
            <TmsInput
              name="password"
              type="password"
              onChange={handleChange}
              value={forms.password}
              label="Password"
              error={errors.password}
            />
            <TmsInput
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={forms.confirmPassword}
              label="Confirm Password"
              error={errors.confirmPassword}
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link to="/login" className="w-full mx-3 py-4">
              <Button className="w-full py-4" gradientMonochrome="success">
                Back to Login
              </Button>
            </Link>

            <Button
              className="w-full mx-3 py-4"
              disabled={!areAllFieldsFilled}
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
