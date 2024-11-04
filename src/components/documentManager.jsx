import { useState } from "react";
import { HiDocument } from "react-icons/hi";
import { Button } from "flowbite-react";
import { Tabs } from "your-tabs-component"; // Adjust import as needed

const DocumentManager = () => {
  const [folders, setFolders] = useState([]);
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);

  const addFolder = (folderName) => {
    setFolders((prevFolders) => [
      ...prevFolders,
      { id: Date.now(), name: folderName, files: [], subfolders: [] },
    ]);
  };

  const addDocument = (folderId, document) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, files: [...folder.files, document] }
          : folder
      )
    );
  };

  const createSubfolder = (parentFolderId, folderName) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.id === parentFolderId) {
          return {
            ...folder,
            subfolders: [
              ...folder.subfolders,
              { id: Date.now(), name: folderName, files: [], subfolders: [] },
            ],
          };
        }
        return folder;
      })
    );
  };

  const deleteDocument = (folderId, documentId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.id === folderId) {
          return {
            ...folder,
            files: folder.files.filter((file) => file.id !== documentId),
          };
        }
        return folder;
      })
    );
  };

  return (
    <Tabs.Item
      disabled={!currentUser.status}
      title="Documents"
      icon={HiDocument}
    >
      <div className="wrapper pb-20">
        <div className="w-full flex justify-end">
          <Button onClick={() => setAddFolderModal(true)}>Add Folder</Button>
          <Button onClick={() => setAddDocumentModal(true)} className="ml-3">
            Add Documents
          </Button>
        </div>
        <h1 className="font-bold text-3xl mt-10">Attached Documents</h1>
        <div className="flex py-5 flex-wrap">
          {folders.length > 0 ? (
            folders.map((folder) => (
              <div
                key={folder.id}
                className="wrapper basis-4/12 flex items-center justify-center flex-col"
              >
                <h2 className="font-bold">{folder.name}</h2>
                <Button
                  onClick={() => setCurrentFolder(folder.id)}
                  className="mt-2"
                >
                  Open Folder
                </Button>
                <div className="flex flex-col">
                  {folder.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between mt-2"
                    >
                      <h3 className="font-semibold">{file.fileLabel}</h3>
                      <Button
                        onClick={() => deleteDocument(folder.id, file.id)}
                        color="failure"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {folder.subfolders.map((subfolder) => (
                    <div key={subfolder.id} className="ml-4">
                      <h4 className="font-semibold">{subfolder.name}</h4>
                      {/* You can add logic to display files in subfolders here */}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <h1 className="text-center font-bold my-5">
                No Documents Provided
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Add Folder Modal */}
      {addFolderModal && (
        <YourModalComponent
          onClose={() => setAddFolderModal(false)}
          onSubmit={addFolder}
        />
      )}
      {/* Add Document Modal */}
      {addDocumentModal && (
        <YourModalComponent
          onClose={() => setAddDocumentModal(false)}
          onSubmit={(document) => addDocument(currentFolder, document)}
        />
      )}
    </Tabs.Item>
  );
};

export default DocumentManager;
