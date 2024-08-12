import Header from "../components/header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      {children}
    </div>
  );
};

export default DefaultLayout;
