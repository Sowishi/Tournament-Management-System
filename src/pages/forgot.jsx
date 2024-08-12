import { Button } from "flowbite-react";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";

const Forgot = () => {
  return (
    <AuthLayout>
      <div className="wrapper">
        <h1 className="text-white font-bold text-3xl">FORGOT PASSWORD</h1>
        <p className="text-white my-2">
          Enter the email address associated with your account{" "}
        </p>
        <TmsInput />
        <Button className="mt-5 w-full">Submit</Button>
      </div>
    </AuthLayout>
  );
};

export default Forgot;
