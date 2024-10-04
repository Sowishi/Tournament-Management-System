import Header from "../components/header";
import { TmsFooter } from "../components/footer";

const DefaultLayout = ({ children, hideHeader }) => {
  return (
    <>
      <div
        className="w-full min-h-screen pb-20"
        style={{
          background: "rgb(252,110,108)",
          background:
            "linear-gradient(189deg, rgba(252,110,108,1) 0%, rgba(252,172,127,1) 100%)",
        }}
      >
        <Header hideHeader={hideHeader} />
        {/* {hideHeader && (
          <div
            style={{
              background:
                "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
            }}
            className="wrapper px-5 py-2 flex items-center justify-start"
          >
            <img className="w-[50px]" src={logo} alt="" />
            <h1 className="font-bold text-white ml-5">
              Regional State Colleges University Athletic Association{" "}
            </h1>
          </div>
        )}
       */}

        {children}
      </div>
      <TmsFooter />
    </>
  );
};

export default DefaultLayout;
