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

const LineGraph = ({
  data,
  keyName,
  lineNames,
  viewRef,
  title,
  paddingTop,
}) => {
  // Wrapped in ResponsiveContainer to avoid LineChart overlap with Legend
  return (
    <div ref={viewRef} className={`center chart ${paddingTop}`}>
      <h4>{title}</h4>
      <ResponsiveContainer height={250}>
        <LineChart data={data}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey={keyName} />
          <YAxis />
          <Tooltip />
          {/* <Legend verticalAlign="bottom" align="center" layout="horizontal" /> */}
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
