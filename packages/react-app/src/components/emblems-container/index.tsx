import React from "react";
import "./index.css";
import { emblemsContainerOptions } from "../../config";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  imageUrls: string[];
}

function EmblemsContainer(props: Props) {
  const { imageUrls } = props;

  const emblems = emblemsContainerOptions.map((option, index) => (
    <div
      key={`emblem_${index}`}
      className="puep-emblem"
      style={{
        transform: `rotate(${option.rotateDegree}deg) translate(125px) rotate(-${option.rotateDegree}deg)`,
      }}
    >
      <div className="puep-circle">
        {imageUrls[index] && (
          <img src={imageUrls[index]} alt="" height="85px" width="85px"></img>
        )}
      </div>
    </div>
  ));
  return (
    <div className="puep-emblems-container">
      {emblems}
      <span>{imageUrls.length}/10</span>
    </div>
  );
}

export default EmblemsContainer;
