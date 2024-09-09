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

  return { getParticipants };
};

export default useCrudParticipants;
