"use client";

import { Badge, Button, Card, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo2.png";
import { HiOutlineUsers, HiOutlineSpeakerphone } from "react-icons/hi";
import moment from "moment";
import useCrudLogs from "../hooks/useCrudLogs";
import { useStore } from "../zustand/store";
import { useEffect, useState } from "react";

export default function TournamentCardRace({
  tournament,

  client,
  isReport,
  onDelete,
}) {
  const { tournament: data } = tournament;
  const navigate = useNavigate();
  const [tournaInfo, setTournaInfo] = useState(null);

  useEffect(() => {
    if (data.categories) {
      try {
        // Attempt to parse the categories as JSON
        const parsedData = JSON.parse(data.categories);
        setTournaInfo(parsedData);
      } catch (error) {
        // If parsing fails, set the categories as is
        setTournaInfo(data.categories);
      }
    }
  }, [data.categories]);

  return (
    <Card
      className="max-w-sm min-h-[29rem] border flex flex-col justify-between"
      style={{
        background: "rgb(2,6,23)",
        background:
          "linear-gradient(164deg, rgba(2,6,23,1) 59%, rgba(252,172,127,1) 91%)",
        height: "350px",
      }}
    >
      <div className="container mx-auto flex flex-col h-full">
        <div className="header flex justify-between items-start">
          {/* <div className="flex items-center justify-start">
            <div
              className={`${getBadgeColor(data.state)}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
              }}
            ></div>
            <Badge color={"warning"} className="ml-2">
              {data.state}
            </Badge>
          </div> */}
        </div>
        <div className="content flex-grow">
          <h1 className="text-white font-bold text-3xl my-5">
            {data.tournamentName}
          </h1>
          <div className="flex flex-col justify-between">
            <div className="info text-white text-sm items-center">
              <span className="opacity-80">Sports: </span>{" "}
              {tournaInfo?.selectedSport} | {tournaInfo?.selectedCategory}
            </div>
            <div className="info text-white text-sm">
              <span className="opacity-80">Category: </span>{" "}
              {tournaInfo?.selectedGender}
            </div>
          </div>

          <div className="badge flex flex-col items-start">
            <Badge size={"md"} className="mt-3">
              Time Trial
            </Badge>
          </div>
          <h1 className="text-white font-bold text-md mt-5 flex items-center">
            <HiOutlineUsers className="mr-1" />
            Participants: {data.participants_count || 0}
          </h1>
          <h1 className="text-white font-bold text-md flex items-center">
            <HiOutlineSpeakerphone className="mr-1" />
            Event: {data?.tournamentEvent}
          </h1>
        </div>
      </div>
      {!isReport && (
        <div className="flex flex-col">
          <Button
            onClick={() => {
              if (client) {
                navigate(`/time-trial/${tournament.id}?client=true`);
              } else {
                navigate(`/time-trial/${tournament.id}`);
              }
            }}
          >
            View Tournament
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {!client && (
            <Button className="mt-3" color={"failure"} onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      )}
      {isReport && (
        <div className="flex flex-col">
          {!client && (
            <Button
              className="mt-3"
              color={"failure"}
              onClick={() => {
                navigate(`/admin/reports/${data.url}`);
              }}
            >
              Generate Report
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
