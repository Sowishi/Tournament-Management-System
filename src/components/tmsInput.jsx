import { Label, TextInput } from "flowbite-react";

const TmsInput = ({
  placeHolder,
  label,
  value,
  onChange,
  name,
  type,
  secured,
  addOn,
  dark,
  required,
  error,
  rightIcon,
}) => {
  return (
    <div>
      <div className="mb-2 block my-3">
        <Label
          className={dark ? "text-slate-950" : "text-white"}
          color={"white"}
          htmlFor="email1"
          value={label}
        />
      </div>
      <TextInput
        addon={addOn}
        name={name}
        onChange={onChange}
        value={value}
        id="email1"
        type={type}
        placeholder={placeHolder}
        required={required}
        color={error ? "failure" : ""}
        helperText={
          <>{error && <span className="font-medium">{error}</span>}</>
        }
        rightIcon={rightIcon}
      />
    </div>
  );
};

export default TmsInput;
