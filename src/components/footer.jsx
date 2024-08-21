import { Footer } from "flowbite-react";
import logo from "../assets/logo2.png";

export function TmsFooter() {
  return (
    <Footer
      style={{
        background:
          "linear-gradient(87deg, rgba(255,51,50,1) 0%, rgba(255,131,76,1) 100%)",
      }}
      container
    >
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="wrapper flex items-center justify-start">
            <img style={{ width: "60px" }} src={logo} alt="" />
            <h1 className="text-white text-2xl font-bold ml-5">
              Tournament Management System
            </h1>
          </div>

          <Footer.LinkGroup className="mr-10">
            <Footer.Link className="text-white" href="/">
              Home
            </Footer.Link>
            <Footer.Link className="text-white" href="/login">
              Login
            </Footer.Link>
            <Footer.Link className="text-white" href="/registration">
              Register
            </Footer.Link>
            <Footer.Link className="text-white" href="/about">
              About us
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className="text-white"
          href="#"
          by="Tournament Management System™"
          year={2024}
        />
      </div>
    </Footer>
  );
}
