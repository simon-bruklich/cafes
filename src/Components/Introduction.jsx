import React from "react";

const Introduction = (props) => {
  return (
    <div className="introduction">
      <p>Enter your county information above to get started</p>
      <p>
        Cafés provides school administrators, teachers, students, parents and
        many others with a Covid-19 risk assessment for schools in the given
        county. The Covid-19 risk assessment is generated from data that is
        updated daily and provides an estimated risk of Covid-19 transmission in
        schools based off of{" "}
        {
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds"
          >
            CDC guidelines.
          </a>
        }{" "}
        For more information, check out our{" "}
        {
          <a target="_blank" rel="noopener noreferrer" href="/about">
            About
          </a>
        }{" "}
        page.
      </p>
    </div>
  );
};

export default Introduction;
