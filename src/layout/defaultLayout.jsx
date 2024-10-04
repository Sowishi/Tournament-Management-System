import Header from "../components/header";
import { TmsFooter } from "../components/footer";

const DefaultLayout = ({ children, hideHeader }) => {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,0L34.3,26.7C68.6,53,137,107,206,112C274.3,117,343,75,411,64C480,53,549,75,617,69.3C685.7,64,754,32,823,21.3C891.4,11,960,21,1029,69.3C1097.1,117,1166,203,1234,218.7C1302.9,235,1371,181,1406,154.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
      <TmsFooter />
    </>
  );
};

export default DefaultLayout;
