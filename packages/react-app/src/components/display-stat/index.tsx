import React from "react";
import { BsArrowRight } from "react-icons/bs";
import "./index.scss";
import { StatDataOptions } from "../../pages/planner/types";
import { capitalize } from "../../utils";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: StatDataOptions[];
  title: string;
}

function DisplayStat(props: Props) {
  const { options, title } = props;

  const stats = options.map((option) => (
    <div key={option.stat} className="display-stat">
      <span>{capitalize(option.stat)}</span>
      <span>
        {option.original_value && (
          <>
            <span>{option.original_value}</span>
            <BsArrowRight style={{ padding: "0px 5px" }} />
          </>
        )}
        <span>{option.value}</span>
      </span>
    </div>
  ));
  return (
    <div className="display-stats-container">
      <h1>{title}</h1>
      <div>{stats}</div>
    </div>
  );
}

export default DisplayStat;
