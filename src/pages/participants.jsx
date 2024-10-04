import DefaultLayout from "../layout/defaultLayout";
import Title from "../components/title";
import { ListGroup } from "flowbite-react";
import logo from "../assets/logo2.png";
import useGetUsers from "../hooks/useGetUsers";
import { useStore } from "../zustand/store";

const Participants = () => {
  const { data } = useGetUsers();
  const { currentEvent } = useStore();

  const filterData = data.filter((user) => {
    if (user.status == "Approve" && user.sportsInfo == currentEvent) {
      return user;
    }
  });

  return (
    <DefaultLayout>
      <Title title="Events  Participants" />
      <div className="container mx-auto p-5">
        <div className="flex justify-center">
          <ListGroup className="w-full">
            {filterData?.map((item) => {
              return (
                <ListGroup.Item key={item.id}>
                  <div className="wrapper flex justify-between items-center w-full">
                    <h1 className=" text-3xl">{item.collegeName}</h1>
                    <img
                      src={item.collegeLogoURL}
                      style={{ width: "50px" }}
                      alt=""
                    />
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
