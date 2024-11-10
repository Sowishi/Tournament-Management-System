import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";

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

  const updateMatchDate = async (start, end, tournamentID, label) => {
    const colRef = collection(db, "matches-calendar");
    const startDateMoment = moment(start).format("LLL");
    const endDateMoment = moment(end).format("LLL");

    try {
      await addDoc(colRef, {
        tournamentID,
        start: startDateMoment,
        end: endDateMoment,
        title: label,
      });
      toast.success("Match date added successfully!");
    } catch (error) {
      toast.error(`Error adding match date: ${error.message}`);
      console.error("Error adding match date:", error);
    }
  };

  const getMatchDates = (tournamentID, setMatchDate) => {
    const colRef = collection(db, "matches-calendar");
    const matchDatesQuery = query(
      colRef,
      where("tournamentID", "==", tournamentID)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      matchDatesQuery,
      (snapshot) => {
        const matchDates = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(matchDates);
        setMatchDate(matchDates); // Use the callback to send data to the component
      },
      (error) => {
        toast.error(`Error fetching match dates: ${error.message}`);
        console.error("Error fetching match dates:", error);
      }
    );

    return unsubscribe; // Return the unsubscribe function to clean up the listener when needed
  };

  return { getMatches, updateMatchWinner, updateMatchDate, getMatchDates };
};

export default useCrudMatches;
