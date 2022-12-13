import * as React from "react";
import "./index.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  disabled: boolean;
  className: string;
}

function Button(props: Props) {
  const { children, disabled, className, ...rest } = props;
  return (
    <button disabled={disabled} className={className} {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
