import React, { memo } from "react";
import "./index.css";

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: string;
}

function Label(props: Props) {
  const { children, ...rest } = props;
  return <span className="puep-label" {...rest}>{children}</span>;
}

export default memo(Label);
