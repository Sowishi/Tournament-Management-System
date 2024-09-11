"use client";

import { Badge, Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo2.png";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

export default function TournamentCard({
  tournament,
  setSelectedTournament,
  setShowModal,
  deleteTournament,
}) {
  const { tournament: data } = tournament;
  const navigation = useNavigate();

  const getBadgeColor = (state) => {
    console.log(state);
    if (state == "pending") {
      return "bg-blue-500";
    } else if (state == "underway") {
      return "bg-yellow-200";
    } else if (state == "complete") {
      return "bg-green-500";
    } else if (state == "awaiting_review") {
      return "bg-yellow-500";
    }
  };
  return (
    <Card
      renderImage={() => {
        return (
          <div className="flex justify-center items- opacity-20">
            <img
              style={{ objectFit: "cover", position: "absolute" }}
              src={logo}
              width={200}
            />
          </div>
        );
      }}
      className="max-w-sm min-h-[29rem] border"
      style={{
        background: "rgb(2,6,23)",
        background:
          "linear-gradient(164deg, rgba(2,6,23,1) 59%, rgba(252,172,127,1) 91%)",
      }}
    >
      <div className="container mx-auto">
        <div className="header flex justify-between">
          <div className="flex items-center justify-start">
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
          </div>
          <p className="text-white text-sm">Aug 20, 2024 </p>
        </div>
        <div className="content">
          <h1 className="text-white font-bold text-3xl my-5">{data.name}</h1>
          <div className="badge flex flex-col items-start">
            <Badge size={"md"} className="mt-3">
              {data.tournament_type}
            </Badge>
            <Badge color={"pink"} size={"md"} className="mt-3">
              {data.description}
            </Badge>
          </div>
          <h1 className="text-white font-bold text-md mt-5 flex items-center ">
            <HiOutlineUsers className="mr-1" />
            Participants: {data.participants_count}
          </h1>
          <h1 className="text-white font-bold text-md  flex items-center ">
            <HiOutlineSpeakerphone className="mr-1" />
            Event: Bicol Meet
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <Button
          onClick={() => {
            setSelectedTournament(data);
            setShowModal(true);
            navigation(`/admin/tournament/${data.url}`);
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
        <Button
          className="mt-3"
          color={"failure"}
          onClick={async () => {
            const res = await deleteTournament(tournament);
            if (res.error) {
              toast.error(res.message);
              return;
            }
            toast.success(res.message);
            window.location.reload();
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
