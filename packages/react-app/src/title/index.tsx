import * as React from "react";
import "./index.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className: string;
}

function Title(props: Props) {
  const { className, children } = props;
  return <h1 className={className}>{children}</h1>;
}

export default Title;
