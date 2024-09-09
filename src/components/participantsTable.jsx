"use client";

import { Table } from "flowbite-react";

export default function ParticipantsTables({ participants }) {
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
                  {participant.final_rank}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
