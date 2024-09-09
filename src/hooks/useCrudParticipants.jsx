import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCrudParticipants = () => {
  const getParticipants = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/get-participants?id=${id}`
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
      const res = await fetch("http://localhost:5000/add-participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ users, id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error adding participant`);
    }
  };

  const deleteParticipant = async (tourID, id) => {
    try {
      const res = await fetch("http://localhost:5000/delete-participant", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ tourID, userID: id }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      return output;
    } catch (error) {
      toast.error(`Error deleting participant`);
    }
  };

  return { getParticipants, addParticipant, deleteParticipant };
};

export default useCrudParticipants;
