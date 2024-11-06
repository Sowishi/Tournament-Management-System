import React from "react";
import { FaFolder, FaTrash } from "react-icons/fa"; // Import the trash icon for deleting

const FolderItem = ({ folder, onDelete }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the folder "${folder.folderName}"?`
      )
    ) {
      onDelete(folder.id); // Pass folder id to the onDelete function
    }
  };

  return (
    <div
      key={folder.key}
      className="flex-shrink-0 w-32 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 basis-2/12 m-3 cursor-pointer"
    >
      <div className="flex justify-center items-center mb-2">
        <FaFolder className="text-4xl text-blue-500" />
      </div>
      <p className="text-center text-sm font-medium">{folder.folderName}</p>
      {/* Delete button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default FolderItem;
