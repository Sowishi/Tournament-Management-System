import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const useCrudTournament = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTournament();
  }, []);

  const getTournament = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/get-tournaments");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const output = await res.json();
      setLoading(false);
      setData(output.data);
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
      console.error("Error fetching data:", error);
    }
  };

  const showTournament = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/show-tournament?id=${id}`);
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

  const startTournament = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/start-tournament?id=${id}`,
        {
          method: "POST",
        }
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

  const finalizeTournament = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/finalize-tournament?id=${id}`,
        {
          method: "POST",
        }
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

  const deleteTournament = async (forms) => {
    const res = await fetch("http://localhost:5000/delete-tournament", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      body: JSON.stringify(forms.tournament),
    });
    const output = await res.json();
    return output;
  };
  return {
    addTournament,
    data,
    loading,
    deleteTournament,
    showTournament,
    startTournament,
    finalizeTournament,
  };
};

export default useCrudTournament;
