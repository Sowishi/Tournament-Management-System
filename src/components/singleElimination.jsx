import logo from "../assets/logo.png";

const SingleElimination = ({ teams }) => {
  const teamsHalf = teams.length / 2;

  const bracketA = teams.slice(0, teamsHalf);
  const bracketB = teams.slice(teamsHalf, teams.length + 1);

  return (
    <div className="container border border-red-500 mx-auto bg-slate-700 min-h-[35rem]">
      <div className="flex min-h-[35rem] ">
        <div className="basis-5/12 h-[35rem]">
          <div className="flex m-1">
            <div className="basis-6/12 border  h-[35rem] justify">
              <div className="flex h-[35rem] flex-col ">
                {bracketA.map((item) => {
                  return (
                    <div
                      key={item}
                      className="basis-6/12 flex items-center justify-center"
                    >
                      <div className="shadow relative bg-white w-[10rem] p-3 rounded flex justify-around items-center">
                        <h1 className="font-bold">{item}</h1>
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={logo}
                          alt=""
                        />
                        <div className="line h-[2px] w-[50px] bg-white absolute right-[-50px]"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="basis-6/12 border h-[35rem] justify-center items-center flex">
              <div className="shadow relative bg-white w-[10rem] p-3 rounded flex justify-around items-center">
                <h1 className="font-bold">Wining</h1>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={logo}
                  alt=""
                />
                <div className="line h-[2px] w-[50px] bg-white absolute left-[-50px]"></div>
                <div className="line h-[2px] w-[50px] bg-white absolute right-[-50px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-2/12 h-[35rem] flex items-center justify-center">
          <div className="shadow bg-white w-[10rem] p-3 rounded flex justify-around items-center">
            <h1 className="font-bold">Winner</h1>
            <img style={{ width: "40px", height: "40px" }} src={logo} alt="" />
            <div className="line h-[2px] w-[50px] bg-white absolute left-[-50px]"></div>
            <div className="line h-[2px] w-[50px] bg-white absolute right-[-50px]"></div>
          </div>{" "}
        </div>
        <div className="basis-5/12 h-[35rem]">
          <div className="flex m-1">
            <div className="basis-6/12 border h-[35rem] justify-center items-center flex">
              <div className="shadow relative bg-white w-[10rem] p-3 rounded flex justify-around items-center">
                <h1 className="font-bold">Wining</h1>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={logo}
                  alt=""
                />
                <div className="line h-[2px] w-[50px] bg-white absolute left-[-50px]"></div>
                <div className="line h-[2px] w-[50px] bg-white absolute right-[-50px]"></div>
              </div>
            </div>
            <div className="basis-6/12 border h-[35rem] justify">
              <div className="flex h-[35rem] flex-col ">
                {bracketB.map((item) => {
                  return (
                    <div
                      key={item}
                      className="basis-6/12 flex items-center justify-center"
                    >
                      <div className="shadow relative bg-white w-[10rem] p-3 rounded flex justify-around items-center">
                        <h1 className="font-bold">{item}</h1>
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={logo}
                          alt=""
                        />
                        <div className="line h-[2px] w-[50px] bg-white absolute left-[-50px]"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleElimination;
