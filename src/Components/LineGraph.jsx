import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import PropTypes from "prop-types";

const LineGraph = (props) => {
  const data = props.data;
  const keyName = props.keyName;
  const lineNames = props.lineNames;

  // Wrapped in ResponsiveContainer to avoid LineChart overlap with Legend
  return (
    <div className="center chart">
      <ResponsiveContainer height={250}>
        <LineChart data={data}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey={keyName} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" layout="horizontal" />
          {lineNames.map((name) => (
            <Line type="linear" dataKey={name} key={name} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LineGraph.propTypes = {
  data: PropTypes.array,
  nameOfKey: PropTypes.string,
  lineNames: PropTypes.arrayOf(PropTypes.string),
};

export default LineGraph;
