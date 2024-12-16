"use client";

import { Table } from "flowbite-react";

export default function RankingTableReport({ participants, tournament }) {
  // Sort participants based on their final rank
  const sortedParticipants = [...participants].sort((a, b) => {
    const rankA = a.participant.final_rank || Infinity;
    const rankB = b.participant.final_rank || Infinity;
    return rankA - rankB;
  });

  return (
    <div className="p-5 my-5 rounded-md  text-black">
      <h2 className="text-2xl font-bold text-center mb-5 text-black">
        Ranking Report - {tournament.name}
      </h2>

      <Table className="w-full text-left text-black">
        <Table.Head>
          <Table.HeadCell className="p-4 text-lg font-bold text-black">
            Participant Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-lg font-bold text-black">
            Ranking
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {sortedParticipants.map((item, index) => {
            const { participant } = item;

            return (
              <tr key={index} className="text-black">
                <Table.Cell className="p-4 text-black">
                  <h1 className="text-black">{participant.name}</h1>
                </Table.Cell>
                <Table.Cell className="p-4 text-black">
                  {participant.final_rank || "----"}
                </Table.Cell>
              </tr>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
