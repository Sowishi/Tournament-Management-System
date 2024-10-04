import { Footer } from "flowbite-react";
import logo from "../assets/logo2.png";

export function TmsFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="wrapper flex items-center justify-start">
            <img style={{ width: "60px" }} src={logo} alt="" />
            <h1 className={"text-2xl font-bold ml-5"}>
              Tournament Management System
            </h1>
          </div>

          {/* <Footer.LinkGroup className="mr-10">
            <Footer.Link href="/">Home</Footer.Link>
            <Footer.Link href="/login">Login</Footer.Link>
            <Footer.Link href="/registration">Register</Footer.Link>
            <Footer.Link href="/about">About us</Footer.Link>
          </Footer.LinkGroup> */}
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by="Tournament Management System™"
          year={2024}
        />
      </div>
    </Footer>
  );
}
