import React from "react";
import "./index.css";
import { StatsDataOptions } from "../../types";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: StatsDataOptions[];
  title: string;
}

function DisplayStats(props: Props) {
  const { options, title, ...rest } = props;

  const stats = options.map((option) => (
    <div key={option.stat} className="puep-stat">
      <span>{option.stat}</span>
      <span>{option.value}</span>
    </div>
  ));
  return (
    <div className="puep-stats-container" {...rest}>
      <h1 className="puep-title">{title}</h1>
      <div className="puep-stats">{stats}</div>
    </div>
  );
}

export default DisplayStats;
