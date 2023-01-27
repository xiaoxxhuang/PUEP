import React from "react";
import "./index.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  disabled: boolean;
}

function Button(props: Props) {
  const { children, disabled, ...rest } = props;
  return (
    <button disabled={disabled} className="puep-button" {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
