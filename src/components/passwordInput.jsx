import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const PasswordInput = ({
  label = "Password",
  placeholder = "Enter your password",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full max-w-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <TextInput
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          className="pr-12"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          {isPasswordVisible ? (
            <EyeOffIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
