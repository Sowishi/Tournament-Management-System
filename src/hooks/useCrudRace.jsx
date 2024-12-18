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

const useCrudRace = () => {
  const getRaces = (setRaces) => {
    const colRef = collection(db, "races");
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setRaces(output);
    });
  };

  const addRace = async (data) => {
    try {
      const colRef = collection(db, "races");
      await addDoc(colRef, { ...data, timestamp: serverTimestamp() });
    } catch (error) {
      console.error("Error adding race:", error);
    }
  };

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

  const deleteRace = async (id) => {
    try {
      const docRef = doc(db, "races", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting race:", error);
    }
  };

  const addParticipant = async (raceId, participant) => {
    try {
      const raceRef = doc(db, "races", raceId);

      // Fetch the race document
      const raceSnapshot = await getDoc(raceRef);

      if (!raceSnapshot.exists()) {
        throw new Error("Race not found");
      }

      const raceData = raceSnapshot.data();
      const participants = raceData.participants || [];

      // Check if the participant already exists
      if (participants.some((p) => p.id === participant.id)) {
        throw new Error("Participant is already added to the race");
      }

      // Add the new participant
      participants.push(participant);
      await updateDoc(raceRef, { participants });

      console.log("Participant added successfully");
      return false;
    } catch (error) {
      console.error("Error adding participant:", error);
      return true;
    }
  };

  return { addRace, getRaces, deleteRace, getRace, addParticipant };
};

export default useCrudRace;
