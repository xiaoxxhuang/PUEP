import React, { memo } from "react";
import "./index.css";

export interface RadioButtonOptions {
  value: string;
  label: string;
}
export interface Props{
  options: RadioButtonOptions[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioButtonGroup(props: Props) {
  const { options, value, onChange } = props;

  const radioButtons = options.map((option) => (
    <label key={option.value}>
      <input
        type="radio"
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
      />
      {option.label}
    </label>
  ));
  return <div>{radioButtons}</div>;
}

export default memo(RadioButtonGroup);
