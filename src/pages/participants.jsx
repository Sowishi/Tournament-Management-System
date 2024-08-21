import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { ListGroup } from "flowbite-react";
import logo from "../assets/logo2.png";

const Participants = () => {
  const data = [
    "Bicol University",
    "Camarines Norte State College",
    "Catanduanes State University",
    "Sorsogon State University",
  ];
  return (
    <DefaultLayout>
      <Title title="Events  Participants" />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <ListGroup className="w-full">
            {data?.map((item) => {
              return (
                <ListGroup.Item key={item}>
                  <div className="wrapper flex justify-between items-center w-full">
                    <h1 className=" text-3xl">{item}</h1>
                    <img src={logo} style={{ width: "50px" }} alt="" />
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Participants;
