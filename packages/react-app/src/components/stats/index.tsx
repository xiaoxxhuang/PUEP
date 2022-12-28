import React, { memo } from "react";
import "./index.css";

export interface StatsDataOptions {
  stat: string;
  value: string;
}
export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: StatsDataOptions[];
}

function Stats(props: Props) {
  const { options, ...rest } = props;

  const stats = options.map((option) => (
    <div key={option.stat} className="puep-stat">
      <span>{option.stat}</span>
      <span>{option.value}</span>
    </div>
  ));
  return <div className="puep-stats"{...rest}>{stats}</div>;
}

export default memo(Stats);
