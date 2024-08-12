import { Label, TextInput } from "flowbite-react";

const TmsInput = ({ placeHolder, label }) => {
  return (
    <div>
      <div className="mb-2 block my-3">
        <Label
          className="text-white"
          color={"white"}
          htmlFor="email1"
          value={label}
        />
      </div>
      <TextInput id="email1" type="email" placeholder={placeHolder} required />
    </div>
  );
};

export default TmsInput;
