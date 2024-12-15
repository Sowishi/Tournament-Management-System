import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import useCrudLogs from "./useCrudLogs";
import { useStore } from "../zustand/store";

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

  const updateMatchWinner = async (tourID, matchID, winnerID, winnerPlayer) => {
    console.log(winnerPlayer);
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/update-match-winner?matchID=${matchID}&tourID=${tourID}&winnerID=${winnerID}&winnerPlayer=${winnerPlayer}`,
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

  const updateMatchDraw = async (tourID, matchID) => {
    try {
      const res = await fetch(
        `https://tournament-management-system-2.onrender.com/update-match-winner?matchID=${matchID}&tourID=${tourID}&winnerID=tie`,
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
      toast.error(`Error updating match as draw: ${error.message}`);
      console.error("Error updating match as draw:", error);
    }
  };

  const updateMatchDate = async (start, end, tournamentID, label, matchID) => {
    const colRef = collection(db, "matches-calendar");
    const startDateMoment = moment(start).format("LLL");
    const endDateMoment = moment(end).format("LLL");

    try {
      await addDoc(colRef, {
        tournamentID,
        matchID,
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

    // Set up a real-time listener using onSnapshot
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

  const getMatchDate = (tournamentID, matchID, setMatchData) => {
    // Reference to the "matches-calendar" collection
    const colRef = collection(db, "matches-calendar");

    // Query to find a document where tournamentID and matchID both match
    const q = query(
      colRef,
      where("tournamentID", "==", tournamentID),
      where("matchID", "==", matchID)
    );

    // Set up a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const matchData = snapshot.docs[0].data();
          setMatchData(matchData); // Assuming one match per tournament and matchID
        } else {
          console.log("No matching match found.");
        }
      },
      (error) => {
        console.error("Error fetching match dates: ", error);
        throw error;
      }
    );

    return unsubscribe; // Return the unsubscribe function to clean up the listener when needed
  };

  const deleteMatchData = (tournamentID, matchID) => {
    // Reference to the "matches-calendar" collection
    const colRef = collection(db, "matches-calendar");

    // Query to find a document where tournamentID and matchID both match
    const q = query(
      colRef,
      where("tournamentID", "==", tournamentID),
      where("matchID", "==", matchID)
    );

    // Set up a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const docRef = snapshot.docs[0].ref; // Get the document reference
          deleteDoc(docRef)
            .then(() => {
              console.log("Match successfully deleted.");
            })
            .catch((error) => {
              console.error("Error deleting match: ", error);
              throw error;
            });
        } else {
          console.log("No matching match found.");
        }
      },
      (error) => {
        console.error("Error deleting match: ", error);
        throw error;
      }
    );

    return unsubscribe; // Return the unsubscribe function to clean up the listener when needed
  };

  return {
    getMatches,
    updateMatchWinner,
    updateMatchDate,
    getMatchDates,
    getMatchDate,
    deleteMatchData,
    updateMatchDraw,
  };
};

export default useCrudMatches;
