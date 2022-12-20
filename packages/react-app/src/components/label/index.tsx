import React, { memo } from "react";
import "./index.css";

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: string;
}

function Label(props: Props) {
  const { children } = props;
  return <span className="puep-label">{children}</span>;
}

export default memo(Label);
