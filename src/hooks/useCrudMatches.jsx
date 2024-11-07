import { toast } from "react-toastify";

const useCrudMatches = () => {
  const getMatches = async (id) => {
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/get-matches?id=${id}`
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

  const updateMatchWinner = async (tourID, matchID, winnerID) => {
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/update-match-winner?matchID=${matchID}&tourID=${tourID}&winnerID=${winnerID}`,
        {
          method: "PUT",
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

  return { getMatches, updateMatchWinner };
};

export default useCrudMatches;
