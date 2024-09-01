import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { useStore } from "../zustand/store";
import TmsInput from "../components/tmsInput";

import { useEffect, useState } from "react";
import TmsSelect from "../components/tmsSelect";
import { Button } from "flowbite-react";
import useUpdateUser from "../hooks/useUpdateUser";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import TmsModal from "../components/tmsModal";
import { HiDocument } from "react-icons/hi";

const User = () => {
  const { currentUser, setCurrentUser } = useStore();
  const { updateUser, addDocument, documents } = useUpdateUser(currentUser.id);
  const [documentModal, setDocumentModal] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileLabel, setFileLabel] = useState();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateUser({
      ...forms,
      id: currentUser.id,
    });
    setCurrentUser({
      ...currentUser,
      ...forms,
    });
    toast.success("Update User Successfully");
  };

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file provided");
        return;
      }

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error); // Reject the promise if there's an error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL); // Resolve the promise with the download URL
            })
            .catch((error) => {
              reject(error); // Reject the promise if there's an error getting the download URL
            });
        }
      );
    });
  };

  const handleUploadDocument = () => {
    addDocument(file, fileLabel, currentUser.id);
    toast.success("Uploaded Successfully");
    setAddDocumentModal(false);
  };
  return (
    <DefaultLayout>
      <Title title={"Users Account"} />
      <TmsModal
        hideFooter
        title={"Documents"}
        openModal={documentModal}
        handleClose={() => setDocumentModal(false)}
      >
        <div className="container">
          <iframe
            width={"100%"}
            height={500}
            src={currentUser.documentsURL}
            frameborder="0"
          ></iframe>
        </div>
      </TmsModal>
      <TmsModal
        disableButton={file == undefined}
        onSubmit={handleUploadDocument}
        title={"Add Documents"}
        openModal={addDocumentModal}
        handleClose={() => setAddDocumentModal(false)}
      >
        <div className="container">
          <TmsInput
            dark={true}
            name="label"
            onChange={(e) => setFileLabel(e.target.value)}
            placeHolder={"Label"}
            label={"Label"}
          />
          <TmsInput
            dark={true}
            name="Document"
            type={"file"}
            onChange={async (e) => {
              const output = await uploadImage(e.target.files[0]);
              setFile(output);
            }}
            placeHolder={"Document"}
            label={"Document"}
          />
        </div>
      </TmsModal>
      <div className="container mx-auto">
        <div className="wrapper flex w-full justify-between items-center px-10 my-10">
          <div className="wrapper">
            <h1 className="text-white text-3xl">
              Account Status:{" "}
              <span className="font-bold">{currentUser.status}</span>
            </h1>
            <div className="wrapper flex items-center justify-start">
              <h1 className="text-white text-3xl">
                College Name:{" "}
                <span className="font-bold">{currentUser.collegeName}</span>
              </h1>
              <img
                className="ml-3"
                width={70}
                height={70}
                src={currentUser.collegeLogoURL}
                alt=""
              />
            </div>
          </div>
          <Button onClick={() => setAddDocumentModal(true)}>
            Add Documents
          </Button>
        </div>
        <div className="wrapper pb-20">
          <h1 className="text-white font-bold text-3xl mt-10">
            Attached Documents
          </h1>
          <div className="flex py-5 flex-wrap">
            {documents.map((item) => {
              return (
                <div className="wrapper basis-4/12 flex items-center justify-center flex-col">
                  {/* <HiDocument color="white" size={100} /> */}
                  <iframe src={item.file} />
                  <h1 className="text-white">{item.fileLabel}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl mt-5">
            Personal Details
          </h1>
          <div className="flex">
            <div className="basis-6/12 mx-3">
              <TmsInput
                required={true}
                name="fullName"
                onChange={handleChange}
                value={forms?.fullName}
                placeHolder={"Full Name"}
                label={"Full Name"}
              />
              <TmsInput
                required={true}
                onChange={handleChange}
                value={forms?.birthDate}
                name={"birthDate"}
                type={"date"}
                placeHolder={"Birthdate"}
                label={"Birth Date"}
              />
              <TmsSelect
                required={true}
                name="gender"
                value={forms?.gender}
                onChange={handleChange}
                label={"Gender"}
                data={["Male", "Female"]}
              />
            </div>
            <div className="basis-6/12 mx-3">
              <TmsInput
                required={true}
                value={forms?.email}
                type={"email"}
                name={"email"}
                onChange={handleChange}
                placeHolder={"Email"}
                label={"Email"}
              />
              <TmsInput
                required={true}
                addOn="+63"
                value={forms?.contactNumber}
                onChange={handleChange}
                name={"contactNumber"}
                placeHolder={"Contact Number"}
                label={"Contact Number"}
              />{" "}
              <TmsInput
                required={true}
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
              required={true}
              value={forms?.sportsInfo}
              name="sportsInfo"
              onChange={handleChange}
              label={"Sports Information"}
              data={["Provincial Meet", "RSCUAA", "Bicol Meet"]}
            />
            <TmsInput
              required={true}
              value={forms?.collegeName}
              name="collegeName"
              onChange={handleChange}
              placeHolder={"Name of school/Institution"}
              label={"College Name"}
            />
            <TmsSelect
              required={true}
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
