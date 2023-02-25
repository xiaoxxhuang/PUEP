import React from "react";
import "./index.css";
import { StatsDataOptions } from "../../pages/planner/types";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: StatsDataOptions[];
  title: string;
}

function capitalizeTitle(str: string) {
  const title = str
    .toLowerCase()
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  return title;
}

function DisplayStats(props: Props) {
  const { options, title } = props;

  const stats = options.map((option) => (
    <div key={option.stat} className="display-stat">
      <span>{capitalizeTitle(option.stat)}</span>
      <span>{option.value}</span>
    </div>
  ));
  return (
    <div className="display-stats-container">
      <h1 className="display-title">{title}</h1>
      <div className="display-stats">{stats}</div>
    </div>
  );
}

export default DisplayStats;
