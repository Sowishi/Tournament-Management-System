import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCrudTournament = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTournament();
  }, []);

  const getTournament = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-tournaments");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      setData(output.data);
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
      console.error("Error fetching data:", error);
    }
  };

  const addTournament = async (forms) => {
    const res = await fetch("http://localhost:5000/create-tournament", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      body: JSON.stringify(forms),
    });
    const output = await res.json();
    return output;
  };
  return { addTournament, data };
};

export default useCrudTournament;
