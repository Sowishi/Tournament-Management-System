import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const useCrudRace = () => {
  // Fetch all races and subscribe to updates
  const getRaces = (setRaces) => {
    const colRef = collection(db, "races");
    onSnapshot(colRef, (snapshot) => {
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRaces(output);
    });
  };

  // Add a new race to the collection
  const addRace = async (data) => {
    try {
      const colRef = collection(db, "races");
      await addDoc(colRef, {
        ...data,
        timestamp: serverTimestamp(),
        status: "Pending",
      });
      console.log("Race added successfully");
    } catch (error) {
      console.error("Error adding race:", error);
    }
  };

  // Fetch a single race by ID and subscribe to updates
  const getRace = (id, setRace) => {
    try {
      const docRef = doc(db, "races", id);
      onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setRace({ ...snapshot.data(), id: snapshot.id });
        } else {
          console.error("Race not found");
        }
      });
    } catch (error) {
      console.error("Error fetching race:", error);
    }
  };

  // Delete a race by ID
  const deleteRace = async (id) => {
    try {
      const docRef = doc(db, "races", id);
      await deleteDoc(docRef);
      console.log("Race deleted successfully");
    } catch (error) {
      console.error("Error deleting race:", error);
    }
  };

  const addParticipants = async (raceID, users) => {
    const raceRef = doc(db, "races", raceID);
    const raceSnapshot = await getDoc(raceRef);

    if (!raceSnapshot.exists()) {
      console.error("Race not found");
      return;
    }

    const raceData = raceSnapshot.data();
    let participants = raceData.participants || [];

    // Check if each user is already in participants
    const existingUsers = users.filter((user) =>
      participants.some((participant) => participant.id === user.id)
    );

    if (existingUsers.length > 0) {
      console.log("Some users are already participants:", existingUsers);
    }

    // Add only new users to participants
    const newUsers = users.filter(
      (user) => !participants.some((participant) => participant.id === user.id)
    );

    if (newUsers.length > 0) {
      participants = [...participants, ...newUsers];
      // Update the race document with the new participants
      await updateDoc(raceRef, { participants });
      toast.success("Added new participants:", newUsers);
    } else {
      toast.error("No new participants were added.");
    }
  };

  const deleteParticipant = async (raceID, participantID) => {
    try {
      const raceRef = doc(db, "races", raceID);
      const raceSnapshot = await getDoc(raceRef);

      if (!raceSnapshot.exists()) {
        console.error("Race not found");
        return;
      }

      const raceData = raceSnapshot.data();
      let participants = raceData.participants || [];

      // Filter out the participant by ID
      const updatedParticipants = participants.filter(
        (participant) => participant.id !== participantID
      );

      if (updatedParticipants.length === participants.length) {
        toast.error("Participant not found in the race.");
        return;
      }

      // Update the race document with the new participants list
      await updateDoc(raceRef, { participants: updatedParticipants });
      toast.success("Participant deleted successfully.");
    } catch (error) {
      console.error("Error deleting participant:", error);
      toast.error("Error deleting participant.");
    }
  };

  const updateRaceState = (id) => {
    const docRef = doc(db, "races", id);
    updateDoc(docRef, { status: "Underway" });
  };

  const finalizeRace = async (id, participantTimes) => {
    try {
      const raceRef = doc(db, "races", id);
      const raceSnapshot = await getDoc(raceRef);

      if (!raceSnapshot.exists()) {
        console.error("Race not found");
        return;
      }

      const raceData = raceSnapshot.data();
      let participants = raceData.participants || [];

      // Update participant times
      participants = participants.map((participant) => {
        if (participantTimes[participant.id]) {
          return {
            ...participant,
            time: participantTimes[participant.id], // Assign the time from participantTimes
          };
        }
        return participant;
      });

      // Update the race document with new status and participants
      await updateDoc(raceRef, {
        status: "Awaiting_Review",
        participants,
      });

      console.log("Race finalized successfully.");
      toast.success("Race finalized and status updated to Awaiting_Review.");
    } catch (error) {
      console.error("Error finalizing race:", error);
      toast.error("Error finalizing race.");
    }
  };

  const updateRaceStateComplete = (id) => {
    const docRef = doc(db, "races", id);
    updateDoc(docRef, { status: "Complete" });
  };

  return {
    addRace,
    getRaces,
    deleteRace,
    getRace,
    addParticipants,
    deleteParticipant,
    updateRaceState,
    finalizeRace,
    updateRaceStateComplete,
  };
};

export default useCrudRace;
