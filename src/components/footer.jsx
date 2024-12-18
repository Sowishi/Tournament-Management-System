// TmsFooter.js
import { Footer } from "flowbite-react";
import logo from "../assets/logo2.png";

export function TmsFooter() {
  return (
    <Footer container className="fixed bottom-0 left-0 w-full">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="wrapper flex items-center justify-start">
            <img style={{ width: "15px" }} src={logo} alt="" />
            <h1 className={"text-sm font-bold ml-5"}>
              Tournament Management System
            </h1>
          </div>
        </div>
      </div>
    </Footer>
  );
}
