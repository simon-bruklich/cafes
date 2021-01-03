import React from "react";

const Cases = (props) => {
  let cases;
  let msg;

  if (typeof props.aggregation === "object" && props.aggregation.length !== 0) {
    const data = props.aggregation;
    cases = data[data.length - 1]["cases"];
    cases = parseInt(cases).toLocaleString();
    const [county, state] = [props.location[0], props.location[1]];
    msg = `${cases} active cases in ${county}, ${state}`;
  } else {
    // TODO:
    msg = "";
  }

  return <h1 className="cases">{msg}</h1>;
};

export default Cases;
