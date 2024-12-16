import React, { useState } from "react";
import sports from "../utils/sports";

const SportsSelection = ({
  selectedCategory,
  selectedSport,
  selectedGender,
  setSelectedCategory,
  setSelectedGender,
  setSelectedSport,
}) => {
  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
    setSelectedCategory("");
    setSelectedGender("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const selectedSportObj = sports.find((s) => s.sport === selectedSport);

  return (
    <div className="sport-selection">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sport</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={selectedSport}
          onChange={handleSportChange}
        >
          <option value="">Select a Sport</option>
          {sports.map((sport, index) => (
            <option key={index} value={sport.sport}>
              {sport.sport}
            </option>
          ))}
        </select>
      </div>

      {selectedSportObj?.categories && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a Category</option>
            {selectedSportObj.categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedSportObj?.genders && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <option value="">Select a Gender</option>
            {selectedSportObj.genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SportsSelection;
