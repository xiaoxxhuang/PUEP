import React from "react";
import "./index.scss";

export interface RadioButtonOptions {
  value: string;
  label: string;
}
export interface Props {
  options: RadioButtonOptions[];
  title: string;
  value: string;
  disabledFocus?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterFocus(props: Props) {
  const { options, title, value, disabledFocus, onChange } = props;

  const radioButtons = options.map((option) => (
    <label key={option.value} className="puep-radiobutton-label">
      <input
        type="radio"
        disabled={option.value === disabledFocus}
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
      />
      {option.label}
    </label>
  ));
  return (
    <div className="puep-radiobuttongroup-container row">
      <div className="col-xs-10 col-sm-2 col-md-2 col-lg-2">
        <span className="puep-label">{title}</span>
      </div>
      <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
        <div className="puep-radiobutton-div">{radioButtons}</div>
      </div>
    </div>
  );
}

export default FilterFocus;
