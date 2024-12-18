import React, { useEffect, useState } from "react";
import useCrudPoints from "../hooks/useCrudPoints";
import { useStore } from "../zustand/store";
import { toast } from "react-toastify";

const PointSystem = () => {
  const { addPoints, getPoints } = useCrudPoints();
  const { currentAdmin, currentEvent } = useStore();
  const [points, setPoints] = useState({
    gold: "",
    silver: "",
    bronze: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoints((prevPoints) => ({
      ...prevPoints,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentAdmin) {
      getPoints(currentAdmin?.sportsEvent, setPoints);
    }
  }, [currentAdmin]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the confirmation modal
  };

  const confirmSubmit = () => {
    addPoints(points, currentAdmin.sportsEvent);
    toast.success("Points successfully submitted!");
    setShowModal(false); // Close modal after submission
  };

  return (
    <div className="w-full mt-10 mx-auto p-4 bg-gray-900 text-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Point System</h1>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Type</th>
              <th className="border border-gray-700 p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 p-2">Gold Points</td>
              <td className="border border-gray-700 p-2">
                <input
                  type="number"
                  name="gold"
                  value={points.gold}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="Enter Gold Points"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-700 p-2">Silver Points</td>
              <td className="border border-gray-700 p-2">
                <input
                  type="number"
                  name="silver"
                  value={points.silver}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="Enter Silver Points"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-700 p-2">Bronze Points</td>
              <td className="border border-gray-700 p-2">
                <input
                  type="number"
                  name="bronze"
                  value={points.bronze}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="Enter Bronze Points"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {!currentEvent?.status && (
          <button
            type="submit"
            className="mt-10 w-full p-2 py-5 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <h1 className="text-2xl font-bold">Submit</h1>
          </button>
        )}
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg text-white w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
            <p className="mb-4">Are you sure you want to submit the points?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointSystem;
