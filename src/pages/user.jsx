import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { useStore } from "../zustand/store";
import TmsInput from "../components/tmsInput";
import { useEffect, useState } from "react";
import TmsSelect from "../components/tmsSelect";
import { Button } from "flowbite-react";
import useUpdateUser from "../hooks/useUpdateUser";
import { toast } from "react-toastify";

const User = () => {
  const { currentUser, setCurrentUser } = useStore();
  const { updateUser } = useUpdateUser();
  const [forms, setForms] = useState({
    fullName: currentUser?.fullName,
    birthDate: currentUser?.birthDate,
    gender: currentUser?.gender,
    email: currentUser?.email,
    contactNumber: currentUser?.contactNumber,
    address: currentUser?.address,
    sportsInfo: currentUser?.sportsInfo,
    collegeName: currentUser?.collegeName,
    position: currentUser?.position,
    password: currentUser?.password,
    confirmPassword: currentUser?.confirmPassword,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    const output = { ...forms, [name]: value };
    setForms(output);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...forms, id: currentUser.id });
    setCurrentUser({ ...currentUser, ...forms });
    toast.success("Update User Successfully");
  };

  return (
    <DefaultLayout>
      <Title title={"Users Account"} />
      <div className="container mx-auto">
        <h1 className="text-3xl text-white uppercase text-center">
          Status: <span>Pending</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl">Personal Details</h1>
          <div className="flex">
            <div className="basis-6/12 mx-3">
              <TmsInput
                name="fullName"
                onChange={handleChange}
                value={forms?.fullName}
                placeHolder={"Full Name"}
                label={"Full Name"}
              />
              <TmsInput
                onChange={handleChange}
                value={forms?.birthDate}
                name={"birthDate"}
                type={"date"}
                placeHolder={"Birthdate"}
                label={"Birth Date"}
              />
              <TmsSelect
                name="gender"
                value={forms?.gender}
                onChange={handleChange}
                label={"Gender"}
                data={["Male", "Female"]}
              />
            </div>
            <div className="basis-6/12 mx-3">
              <TmsInput
                value={forms?.email}
                type={"email"}
                name={"email"}
                onChange={handleChange}
                placeHolder={"Email"}
                label={"Email"}
              />
              <TmsInput
                addOn="+63"
                value={forms?.contactNumber}
                onChange={handleChange}
                name={"contactNumber"}
                placeHolder={"Contact Number"}
                label={"Contact Number"}
              />{" "}
              <TmsInput
                value={forms?.address}
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
              value={forms?.sportsInfo}
              name="sportsInfo"
              onChange={handleChange}
              label={"Sports Information"}
              data={["Provincial Meet", "RSCUAA", "Bicol Meet"]}
            />
            <TmsInput
              value={forms?.collegeName}
              name="collegeName"
              onChange={handleChange}
              placeHolder={"Name of school/Institution"}
              label={"College Name"}
            />
            <TmsSelect
              value={forms?.position}
              name="position"
              onChange={handleChange}
              label={"Position"}
              data={["Student", "Faculty", "Coach", "Others"]}
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button
              onClick={() => {
                setCurrentUser(null);
              }}
              className="w-full mx-3 py-4"
              gradientMonochrome="failure"
              type="submit"
            >
              Logout
            </Button>
            <Button
              className="w-full mx-3 py-4"
              gradientMonochrome="info"
              type="submit"
            >
              Update User Account
            </Button>
          </div>
        </form>{" "}
      </div>
    </DefaultLayout>
  );
};

export default User;
