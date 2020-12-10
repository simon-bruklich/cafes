import React from "react";

const Introduction = (props) => {
  return (
    <div>
      <span>Welcome to </span>
      <span>Cafés,</span>
      <p>(Covid-19 Advising For Educational Systems),</p>
      {/* TODO: move to ABOUT page */}
      {/* <p>
        a tool for estimating the risk of exposure for Covid-19 at your school
        based on CDC guidelines
      </p> */}
      <p>Enter your county to get started</p>
    </div>
  );
};

export default Introduction;
