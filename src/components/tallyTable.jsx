import { Table } from "flowbite-react";
import logo from "../assets/logo2.png";

export function TallyTable() {
  const data = [
    "Bicol University",
    "Camarines Norte State College",
    "Catanduanes State University",
    "Sorsogon State University",
  ];
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>
            <h1 className="text-2xl">Colleges/Instutution</h1>
          </Table.HeadCell>
          <Table.HeadCell>
            <h1 className="text-2xl text-amber-900">Bronze</h1>
          </Table.HeadCell>{" "}
          <Table.HeadCell>
            <h1 className="text-2xl text-slate-400">Silver</h1>
          </Table.HeadCell>{" "}
          <Table.HeadCell>
            <h1 className="text-2xl text-yellow-400">Gold</h1>
          </Table.HeadCell>{" "}
          <Table.HeadCell>
            <h1 className="text-2x">Results</h1>
          </Table.HeadCell>{" "}
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((item) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="wrapper flex justify-start items-center">
                    <h1 className=" text-lg mr-5">{item}</h1>
                    <img src={logo} style={{ width: "50px" }} alt="" />
                  </div>
                </Table.Cell>
                <Table.Cell>32</Table.Cell>
                <Table.Cell>33</Table.Cell>
                <Table.Cell>79</Table.Cell>
                <Table.Cell>Champion</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
