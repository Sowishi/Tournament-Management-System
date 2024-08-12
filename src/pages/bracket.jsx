import DefaultLayout from "../layout/defaultLayout";

const Bracket = () => {
  return (
    <DefaultLayout hideHeader={true}>
      <div className="w-full mx-auto min-h-screen">
        <div
          className="wrapper h-screen mx-3 mt-5 rounded-lg p-5 mb-5"
          style={{
            background:
              "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
          }}
        >
          <h1 className="text-white font-bold text-3xl">Events Display</h1>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Bracket;
