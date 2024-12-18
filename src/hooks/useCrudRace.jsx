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
      await addDoc(colRef, { ...data, timestamp: serverTimestamp() });
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

  return {
    addRace,
    getRaces,
    deleteRace,
    getRace,
    addParticipants,
  };
};

export default useCrudRace;
