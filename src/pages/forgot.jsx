import { Button } from "flowbite-react";
import TmsInput from "../components/tmsInput";
import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import useGetUsers from "../hooks/useGetUsers";
import sendResetPassword from "../utils/sendResetPassword";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useGetUsers();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      // Check if the email exists in the users' data
      const user = data?.find((user) => user.email === email);

      if (user) {
        toast.success("Password reset link sent to your email!");
        sendResetPassword(user);
        // TODO: Implement actual password reset email logic
      } else {
        toast.error("No account found with this email address.");
      }
    } catch (error) {
      console.error(error); // For debugging
      toast.error("Failed to process your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="wrapper bg-slate-600 p-10 md:p-20 rounded-lg">
        <h1 className="text-white font-bold text-2xl md:text-3xl text-center">
          FORGOT PASSWORD
        </h1>
        <p className="text-white my-4 text-center">
          Enter the email address associated with your account.
        </p>
        <TmsInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeHolder="Enter your email"
          label="Email Address"
        />
        <Button
          onClick={handleForgotPassword}
          disabled={loading}
          className="mt-5 w-full"
          gradientMonochrome="info"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Forgot;
