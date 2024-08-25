import { Label, Select } from "flowbite-react";

const TmsSelect = ({ data, label, onChange, name, dark }) => {
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
      <Select name={name} onChange={onChange}>
        {data?.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </Select>
    </div>
  );
};

export default TmsSelect;
