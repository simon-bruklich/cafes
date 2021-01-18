import React from 'react';

/**
 * Component to show "Cases" summary at the top of the assessment page.
 * @param {*} props aggregation of data and name of the given location.
 */
const Cases = ({ aggregation, location }) => {
  let cases;
  let msg = '';

  if (typeof aggregation === 'object' && aggregation.length !== 0) {
    const data = aggregation;
    cases = data[data.length - 1].cases;
    cases = parseInt(cases).toLocaleString();
    const [county, state] = [location[0], location[1]];
    msg = `${cases} active cases in ${county}, ${state}`;
  }

  return <h1 className="cases">{msg}</h1>;
};

export default Cases;
