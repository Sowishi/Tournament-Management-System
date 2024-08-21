import { Label, TextInput } from "flowbite-react";

const TmsInput = ({
  placeHolder,
  label,
  value,
  onChange,
  name,
  type,
  secured,
}) => {
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
      <TextInput
        name={name}
        onChange={onChange}
        value={value}
        id="email1"
        type={type}
        placeholder={placeHolder}
        required
      />
    </div>
  );
};

export default TmsInput;
