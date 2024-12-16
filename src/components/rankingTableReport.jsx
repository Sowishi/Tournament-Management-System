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
    <div className="p-5 my-5 bg-gray-800 rounded-md text-white">
      <h2 className="text-2xl font-bold text-center mb-5">
        Ranking Report - {tournament.name}
      </h2>

      <Table className="w-full text-left text-gray-100">
        <Table.Head>
          <Table.HeadCell className="p-4 text-lg font-bold bg-gray-900">
            Participant Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-lg font-bold bg-gray-900">
            Ranking
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {sortedParticipants.map((item, index) => {
            const { participant } = item;

            return (
              <tr key={index} className="bg-gray-700">
                <Table.Cell className="p-4">{participant.name}</Table.Cell>
                <Table.Cell className="p-4">
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
