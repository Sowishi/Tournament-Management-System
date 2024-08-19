import Header from "../components/header";
import logo from "../assets/logo2.png";

const DefaultLayout = ({ children, hideHeader }) => {
  return (
    <div className="w-full min-h-screen" style={{ background: "#FC8F76" }}>
      {hideHeader && (
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
      <Header hideHeader={hideHeader} />

      {children}
    </div>
  );
};

export default DefaultLayout;
