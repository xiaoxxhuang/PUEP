import React, { memo } from "react";
import "./index.css";

export interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: string;
}

function Title(props: Props) {
  const { children } = props;
  return <h1 className="puep-title">{children}</h1>;
}

export default memo(Title);
