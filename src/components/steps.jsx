const Steps = ({ setSteps, steps }) => {
  return (
    <div className="steps flex justify-center items-center">
      <div
        onClick={() => setSteps(1)}
        className="step-wrapper flex flex-row items-center "
      >
        <div className="step flex justify-center items-center">
          <div
            style={{
              cursor: "pointer",
              background: steps == 1 ? "#e2b001" : "#FF3734",
            }}
            className="wrapper w-10 h-10 rounded-full flex items-center justify-center"
          >
            1
          </div>
        </div>
        <div className="line w-[100px] h-[3px] bg-white"></div>
      </div>
      <div
        onClick={() => setSteps(2)}
        className=" step-wrapper flex flex-row items-center"
      >
        <div className="step flex justify-center items-center">
          <div
            style={{
              cursor: "pointer",
              background: steps == 2 ? "#e2b001" : "#FF3734",
            }}
            className="wrapper w-10 h-10 rounded-full flex items-center justify-center"
          >
            2
          </div>
        </div>
        <div className="line w-[100px] h-[3px] bg-white"></div>
      </div>
      <div className=" step-wrapper flex flex-row items-center">
        <div className="step flex justify-center items-center">
          <div
            style={{
              cursor: "not-allowed",
              background: steps == 3 ? "#e2b001" : "#FF3734",
            }}
            className="wrapper w-10 h-10 rounded-full flex items-center justify-center"
          >
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
