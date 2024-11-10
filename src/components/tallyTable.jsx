import { Table } from "flowbite-react";
import logo from "../assets/logo2.png";
import useCrudTally from "../hooks/useCrudTally";
import { useStore } from "../zustand/store";

export function TallyTable() {
  const { data } = useCrudTally();
  const { currentEvent } = useStore();
  const filteredData = data.filter((item) => item.event === currentEvent);

  // Group and count ranks for each institution, based on the filtered data
  const rankCounts = filteredData.reduce((acc, item) => {
    const institution = item.name; // Use 'name' as institution name
    const rank = item.rank; // Rank field to count

    // Initialize the institution in accumulator if not present
    if (!acc[institution]) {
      acc[institution] = { Bronze: 0, Silver: 0, Gold: 0 };
    }

    // Increment the respective rank count based on the rank value
    if (rank === 3) acc[institution].Bronze += 1;
    if (rank === 2) acc[institution].Silver += 1;
    if (rank === 1) acc[institution].Gold += 1;

    return acc;
  }, {});

  if (filteredData.length <= 0) {
    return (
      <>
        <div className="container h-[20rem] mx-auto flex justify-center items-center">
          <p>There's no tally yet</p>
        </div>
      </>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>
            <h1 className="text-2xl">Colleges/Institution</h1>
          </Table.HeadCell>
          <Table.HeadCell>
            <h1 className="text-2xl text-amber-900">Bronze</h1>
          </Table.HeadCell>
          <Table.HeadCell>
            <h1 className="text-2xl text-slate-400">Silver</h1>
          </Table.HeadCell>
          <Table.HeadCell>
            <h1 className="text-2xl text-yellow-400">Gold</h1>
          </Table.HeadCell>
          {/* <Table.HeadCell>
            <h1 className="text-2xl">Results</h1>
          </Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
          {Object.entries(rankCounts).map(([institution, counts], index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <img
                    src={logo}
                    style={{ width: "50px" }}
                    alt={`${institution} logo`}
                    className="mr-3"
                  />
                  <span className="text-lg">{institution}</span>
                </div>
              </Table.Cell>
              <Table.Cell>{counts.Bronze}</Table.Cell>
              <Table.Cell>{counts.Silver}</Table.Cell>
              <Table.Cell>{counts.Gold}</Table.Cell>
              {/* <Table.Cell>----</Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
