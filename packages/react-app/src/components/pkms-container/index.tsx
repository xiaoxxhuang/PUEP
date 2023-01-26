import React from "react";
import "./index.css";

export interface PkmOptions {
  order: number;
}
export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: PkmOptions[];
}

function PkmsContainer(props: Props) {
  const { options, ...rest } = props;

  const pkms = options.map((option) => (
    <div key={`pkm_${option.order}`} className="puep-pkm"></div>
  ));

  return (
    <div className="puep-pkms-container" {...rest}>
      {pkms}
    </div>
  );
}

export default PkmsContainer;
