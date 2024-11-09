import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { useStore } from "../zustand/store";
import TmsInput from "../components/tmsInput";
import logo from "../assets/logo2.png";

import { useEffect, useState } from "react";
import TmsSelect from "../components/tmsSelect";
import { Badge, Button, Tabs } from "flowbite-react";
import useUpdateUser from "../hooks/useUpdateUser";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import TmsModal from "../components/tmsModal";
import { HiDocument, HiLogin, HiUserCircle } from "react-icons/hi";
import useGetEventName from "../hooks/useGetEventName";
import useCrudCollegeName from "../hooks/useCrudCollegeName";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { collection, query, where } from "firebase/firestore";
import useCrudDocs from "../hooks/useCrudDocs";
import { FaFolder } from "react-icons/fa"; // Example: Folder icon from react-icons
import FolderItem from "../components/folderItem";
import { Breadcrumb } from "flowbite-react";

const User = () => {
  const { currentUser, setCurrentUser } = useStore();
  const { updateUser, addDocument, deleteDocument, documents, uploadLogo } =
    useUpdateUser();

  const {
    handleCreateFolder,
    getUserFolders,
    handleDeleteFolder,
    handleCreateFile,
    getFilesInFolder,
  } = useCrudDocs();
  const [documentModal, setDocumentModal] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [addLogoModal, setAddLogoModal] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileLabel, setFileLabel] = useState();
  const [logoFile, setLogoFile] = useState();

  const [forms, setForms] = useState({
    collegeName: currentUser?.collegeName,
    contact: currentUser?.contact,
    createdAt: currentUser?.createdAt,
    password: currentUser?.password,
    confirmPassword: currentUser?.confirmPassword,

    schoolRepresentative: currentUser?.schoolRepresentative,
    sportsEvent: currentUser?.sportsEvent,
    username: currentUser?.username,
    email: currentUser?.email,
  });

  const [passwordValidation, setPasswordValidation] = useState("");
  const [phoneValidation, setPhoneValidation] = useState("");
  const { data: eventNames } = useGetEventName();
  const { data: collegeNames } = useCrudCollegeName();
  const [folderModal, setFolderModal] = useState(false);
  const [folderName, setFolerName] = useState("");
  const [folders, setFolders] = useState([]);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentFiles, setCurrentFiles] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name == "contact") {
      if (value.length > 10 || value[0] != "9") {
        setPhoneValidation(
          "Phone number must be 10 digits long and start with '9'"
        );
      }
      if (value.length <= 10 || value[0] == "9") {
        setPhoneValidation(undefined);
      }
    }

    if (name == "password") {
      if (value.length < 8) {
        setPasswordValidation("Password must be at least 8 characters long");
      } else {
        setPasswordValidation(undefined);
      }
      if (value !== forms.password) {
        setPasswordValidation("Password does not match");
      }

      if (value == forms.password) {
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
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...currentUser,
        ...forms,
      })
    );
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
    handleCreateFile(file, fileLabel, currentUser.id, currentFolder.id);
    toast.success("Uploaded Successfully");
    setAddDocumentModal(false);
  };

  const handleUploadLogo = () => {
    uploadLogo(currentUser, logoFile);
    setCurrentUser({
      ...currentUser,
      ...forms,
      collegeLogoURL: logoFile,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...currentUser,
        ...forms,
        collegeLogoURL: logoFile,
      })
    );
    setAddLogoModal(false);
    toast.success("Successfully added logo");
  };

  const documentsFilter = documents.filter((doc) => {
    if (doc.owner == currentUser.id) {
      return doc;
    }
  });

  const getStatusColor = (status) => {
    if (status == "Pending") {
      return "info";
    } else if (status == "Approve") {
      return "success";
    } else {
      return "failure";
    }
  };

  const formatEventNames = eventNames.map((item) => {
    return item.eventName;
  });

  const formatCollegeNames = collegeNames.map((item) => {
    return item.collegeName;
  });

  const getFolders = async () => {
    getUserFolders(currentUser, setFolders);
  };

  useEffect(() => {
    getFolders();
  }, []);

  useEffect(() => {
    if (currentFolder) {
      getFilesInFolder(currentFolder.id, setCurrentFiles);
    }
  }, [currentFolder]);

  return (
    <DefaultLayout>
      <Title title={"User Account"} />
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
        onSubmit={handleUploadLogo}
        title={"Add Logo"}
        openModal={addLogoModal}
        handleClose={() => setAddLogoModal(false)}
      >
        <div className="container">
          <div className="flex justify-center items-center">
            <img style={{ width: 150 }} src={logoFile} />
          </div>
          <TmsInput
            onChange={async (e) => {
              const output = await uploadImage(e.target.files[0]);
              setLogoFile(output);
            }}
            type={"file"}
          />
        </div>
      </TmsModal>
      {/* Documents Modal */}
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
      {/* Folder Modal */}
      <TmsModal
        onSubmit={() => {
          handleCreateFolder(folderName, currentUser.id);
          setFolderModal(false);
        }}
        title={"Add Folders"}
        openModal={folderModal}
        handleClose={() => setFolderModal(false)}
      >
        <div className="container">
          <TmsInput
            dark={true}
            onChange={(e) => setFolerName(e.target.value)}
            placeHolder={"Folder Name"}
            label={"Folder Name"}
          />
        </div>
      </TmsModal>
      <div className="container mx-auto p-10 mb-20">
        <div className="shadow-2xl bg-white flex flex-col justify-center items-center p-10 rounded-2xl">
          <img
            className="ml-3"
            width={250}
            height={250}
            src={currentUser.collegeLogoURL ? currentUser.collegeLogoURL : logo}
            alt=""
          />
          <Button
            color={"success"}
            className="mt-3"
            onClick={() => setAddLogoModal(true)}
          >
            {currentUser.collegeLogoURL ? "Change Logo" : "Add Logo"}
          </Button>

          <div className="flex items-center justify-center flex-col mt-5">
            <h1 className="text-3xl">
              College Name:{" "}
              <span className="font-bold">{currentUser.collegeName}</span>
            </h1>
            <div className="flex mt-3">
              <h1 className=" text-3xl">Account Status: </h1>
              <Badge
                color={getStatusColor(
                  currentUser.status ? currentUser.status : "Pending"
                )}
                className={`font-bold ml-3 text-2xl `}
              >
                {currentUser.status ? currentUser.status : "Pending"}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs aria-label="Default tabs" variant="default" className="mt-5">
          <Tabs.Item active title="Profile" icon={HiUserCircle}>
            <form
              onSubmit={handleSubmit}
              className="shadow-xl p-10 bg-white rounded-2xl"
            >
              <h1 className=" font-bold text-3xl">SUCS details</h1>
              <div className="flex">
                <div className="basis-full mx-3">
                  <TmsInput
                    name="schoolRepresentative"
                    onChange={handleChange}
                    value={forms.schoolRepresentative}
                    placeHolder={"SUCs Representative"}
                    label={"SUCs Representative"}
                    dark
                  />
                  <TmsInput
                    onChange={handleChange}
                    value={forms.email}
                    name={"email"}
                    type={"email"}
                    placeHolder={"Email"}
                    label={"SUCs Email"}
                    dark
                  />
                  <TmsInput
                    addOn={"+63"}
                    onChange={handleChange}
                    value={forms.contact}
                    name={"contact"}
                    placeHolder={"SUCs Contact"}
                    label={"SUCs Contact"}
                    error={phoneValidation}
                    dark
                  />
                </div>
              </div>
              <h1 className=" font-bold text-3xl mt-10">Sports Information</h1>
              <div className="flex mx-3 flex-col">
                <TmsSelect
                  name="sportsEvent"
                  onChange={handleChange}
                  label={"Sports Information"}
                  data={[forms.sportsEvent, ...formatEventNames]}
                  dark
                />
                <TmsSelect
                  name="collegeName"
                  onChange={handleChange}
                  label={"College Name"}
                  data={[forms.collegeName, ...formatCollegeNames]}
                  dark
                />
              </div>

              <h1 className=" font-bold text-3xl mt-10">Account Information</h1>

              <div className="flex flex-wrap mx-3">
                <div className="basis-full">
                  <TmsInput
                    onChange={handleChange}
                    value={forms.username}
                    name={"username"}
                    placeHolder={"Username"}
                    label={"Username"}
                    dark
                  />
                </div>
                <div className="basis-6/12 pr-5">
                  <TmsInput
                    name={"password"}
                    value={forms.password}
                    onChange={handleChange}
                    placeHolder={"Password"}
                    label={"Password"}
                    error={passwordValidation}
                    dark
                  />
                </div>
                <div className="basis-6/12">
                  <TmsInput
                    value={forms.confirmPassword}
                    name={"confirmPassword"}
                    onChange={handleChange}
                    placeHolder={"Confirm Password"}
                    label={"Confirm Password"}
                    error={passwordValidation}
                    dark
                  />
                </div>
              </div>

              <div className="flex justify-center items-center mt-10">
                <Button
                  className="w-full mx-3 py-4"
                  gradientMonochrome="info"
                  type="submit"
                >
                  Update Account
                </Button>
              </div>
            </form>
          </Tabs.Item>
          <Tabs.Item
            disabled={!currentUser.status}
            title="Documents"
            icon={HiDocument}
          >
            <div className="wrapper pb-52">
              <div className="w-full flex justify-end">
                {folders.length >= 1 && currentFolder !== null && (
                  <Button onClick={() => setAddDocumentModal(true)}>
                    Add Documents
                  </Button>
                )}
                <Button className="ml-3" onClick={() => setFolderModal(true)}>
                  Add Folder
                </Button>
              </div>
              <h1 className=" font-bold text-3xl mt-10">Attached Documents</h1>
              <Breadcrumb aria-label="Breadcrumb navigation" className="my-4">
                <Breadcrumb.Item
                  onClick={() => setCurrentFolder(null)}
                  icon="home"
                >
                  User
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/category">
                  {currentFolder?.folderName}
                </Breadcrumb.Item>
              </Breadcrumb>
              {!currentFolder && (
                <div className="flex flex-wrap">
                  {folders.map((folder) => {
                    return (
                      <FolderItem
                        event={() => {
                          setCurrentFolder(folder);
                        }}
                        key={folder.key}
                        folder={folder}
                        onDelete={() => handleDeleteFolder(folder.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item
            disabled={!currentUser.status}
            title="Challonge"
            icon={HiLogin}
          >
            <div className="wrapper my-10">
              <div className="wrapper flex flex-col items-start justify-start">
                <div className="flex flex-col">
                  <h1 className=" font-bold text-3xl">Register to Challonge</h1>
                  <p className=" mt-2">
                    Register to Challonge to add your own custom logo use your
                    registered email as your challonge account
                  </p>
                </div>

                <a
                  className="mt-5"
                  target="_blank"
                  href="https://challonge.com/users/new?continue=/dashboard"
                >
                  <Button>Register to Challonge</Button>
                </a>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default User;
