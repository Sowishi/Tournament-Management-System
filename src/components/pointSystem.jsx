import React, { useState } from "react";

const PointSystem = () => {
  const [points, setPoints] = useState({
    gold: "",
    silver: "",
    bronze: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoints((prevPoints) => ({
      ...prevPoints,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Points:", points);
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
        <button
          type="submit"
          className="mt-10 w-full p-2 py-5 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <h1 className="text-2xl font-bold">Submit</h1>
        </button>
      </form>
    </div>
  );
};

export default PointSystem;
