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
  const { options, value, onChange, ...rest } = props;

  const radioButtons = options.map((option) => (
    <label key={option.value} className="puep-radiobutton-label">
      <input
        type="radio"
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
      />
      {option.label}
    </label>
  ));
  return <div className="puep-radiobutton-div" {...rest}>{radioButtons}</div>;
}

export default memo(RadioButtonGroup);
