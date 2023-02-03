import React from "react";
import "./index.css";

export interface EmblemsOptions {
  order: number;
  rotateDegree: number;
}
export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: EmblemsOptions[];
}

function EmblemsContainer(props: Props) {
  const { options } = props;

  const emblems = options.map((option) => (
    <div
      key={`emblem_${option.order}`}
      className="puep-emblem"
      style={{
        transform: `rotate(${option.rotateDegree}deg) translate(125px) rotate(-${option.rotateDegree}deg)`,
      }}
    >
      <div className="puep-circle"></div>
    </div>
  ));
  return (
    <div className="puep-emblems-container">
      {emblems}
      0/10
    </div>
  );
}

export default EmblemsContainer;
