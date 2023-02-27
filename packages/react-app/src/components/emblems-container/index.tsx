import React from "react";
import "./index.css";

export interface EmblemsOptions {
  order: number;
  rotateDegree: number;
  imageUrl: string | undefined;
}
export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: EmblemsOptions[];
}

function EmblemsContainer(props: Props) {
  const { options } = props;

  const emblems = options.map((option, index) => (
    <div
      key={`emblem_${index}`}
      className="puep-emblem"
      style={{
        transform: `rotate(${index * 36}deg) translate(125px) rotate(-${
          index * 36
        }deg)`,
      }}
    >
      <div className="puep-circle">
        {option.imageUrl && (
          <img src={option.imageUrl} alt="" height="85px" width="85px"></img>
        )}
      </div>
    </div>
  ));
  return (
    <div className="puep-emblems-container">
      {emblems}
      {options.length}/10
    </div>
  );
}

export default EmblemsContainer;
