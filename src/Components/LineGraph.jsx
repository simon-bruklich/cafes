import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Abstracted linegraph component used for all linegraphs.
 * @param {*} props Data to present, name of key legend, name of charted line, viewRef context, title of graph, and optional top padding
 */
const LineGraph = ({ data, keyName, lineNames, viewRef, title, paddingTop }) => {
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
  data: PropTypes.arrayOf(PropTypes.object),
  keyName: PropTypes.string,
  lineNames: PropTypes.arrayOf(PropTypes.string),
  viewRef: PropTypes.object,
  title: PropTypes.string,
  paddingTop: PropTypes.string,
};

export default LineGraph;
