import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCrudParticipants = () => {
  const getParticipants = async (id) => {
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/get-participants?id=${id}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
      console.error("Error fetching data:", error);
    }
  };

  const addParticipant = async (users, id) => {
    try {
      const res = await fetch(
        "https://tournament-management-system-2.onrender.com/add-participant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          body: JSON.stringify({ users, id }),
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error adding participant`);
    }
  };

  const showParticipant = async (tourID, userID) => {
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/show-participant?tourID=${tourID}&userID=${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error showing participant`);
    }
  };

  const deleteParticipant = async (tourID, id) => {
    try {
      const res = await fetch(
        "https://tournament-management-system-2.onrender.com/delete-participant",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          body: JSON.stringify({ tourID, userID: id }),
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error deleting participant`);
    }
  };

  return {
    getParticipants,
    addParticipant,
    deleteParticipant,
    showParticipant,
  };
};

export default useCrudParticipants;
