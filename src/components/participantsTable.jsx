"use client";

import { Button, Table } from "flowbite-react";

export default function ParticipantsTables({
  participants,
  handleDeleteParticipant,
  tournament,
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head className="bg-slate-950">
          <Table.HeadCell className="bg-slate-800 text-white">
            <h1 className="text-lg">Participant Name</h1>
          </Table.HeadCell>
          {/* <Table.HeadCell className="bg-slate-800 text-white">
            <h1 className="text-lg">School/College</h1>
          </Table.HeadCell> */}
          <Table.HeadCell className="bg-slate-800 text-white">
            <h1 className="text-lg">Ranking</h1>
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-800 text-white flex justify-center items-center">
            <h1 className="text-lg">Action</h1>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {participants.map((item) => {
            const { participant } = item;
            return (
              <Table.Row className="bg-slate-700 text-white">
                <Table.Cell className="text-white">
                  {participant.name}
                </Table.Cell>
                {/* <Table.Cell className="text-white">Sliver</Table.Cell> */}

                <Table.Cell className="text-white">
                  {participant.final_rank ? participant.final_rank : "----"}
                </Table.Cell>
                <Table.Cell className="text-white flex justify-center items-center">
                  <Button
                    disabled={tournament?.state != "pending"}
                    onClick={() => handleDeleteParticipant(participant.id)}
                    color={"failure"}
                  >
                    Delete Participant
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
