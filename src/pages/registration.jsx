import { Button } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { addUser } = useAddUser();
  const { data: eventNames } = useGetEventName();
  const { data: collegeNames } = useCrudCollegeName();
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
      <div className="wrapper w-full rounded-lg py-10">
        <div className="text-center flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col items-center justify-center  mb-10">
            <h1 className="text-white text-4xl md:text-5xl font-bold">
              Registration
            </h1>
            <p className="text-white text-2xl mt-2">
              Registration to Tournament Management System
            </p>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-white font-bold text-2xl md:text-3xl">
                  Delegate Details
                </h1>
                <TmsInput
                  name="schoolRepresentative"
                  onChange={handleChange}
                  value={forms.schoolRepresentative}
                  label="Delegate Name"
                />
                <TmsInput
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={forms.email}
                  label="Email"
                  error={errors.email}
                />
                <TmsInput
                  addOn="+63"
                  name="contact"
                  onChange={handleChange}
                  value={forms.contact}
                  label="Delegate Contact"
                  error={errors.contact}
                />
              </div>

              <div>
                <h1 className="text-white font-bold text-2xl md:text-3xl">
                  Account Information
                </h1>
                <TmsInput
                  name="username"
                  onChange={handleChange}
                  value={forms.username}
                  label="Username"
                />
                <div className="relative">
                  <TmsInput
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    onChange={handleChange}
                    value={forms.password}
                    label="Password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute inset-y-0 right-2 top-8 flex items-center"
                  >
                    {showPassword.password ? (
                      <FaEyeSlash className="w-5" />
                    ) : (
                      <FaEye className="w-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <TmsInput
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={forms.confirmPassword}
                    label="Confirm Password"
                    error={errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-2 top-8 flex items-center"
                  >
                    {showPassword.confirmPassword ? (
                      <FaEyeSlash className="w-5" />
                    ) : (
                      <FaEye className="w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                Events Information
              </h1>
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
                  label="Delegation"
                  data={["Please select Delegation", ...formatCollegeNames]}
                />
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
              <Link to="/login" className="w-full md:w-1/2">
                <Button className="w-full py-4" gradientMonochrome="success">
                  <h1 className="text-lg font-bold">Back to Login</h1>
                </Button>
              </Link>
              <Button
                className="w-full md:w-1/2 py-4"
                disabled={!areAllFieldsFilled}
                gradientMonochrome="info"
                type="submit"
              >
                <h1 className="text-lg font-bold">Log In</h1>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Registration;
