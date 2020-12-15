import React from "react";
import PropTypes from "prop-types";

/**
 * Provides user with a recommendation based on CDC guidelines:
 * Lowest Risk: <5
 * Lower Risk: 5 to <20
 * Moderate Risk: 20 to <50
 * Higher Risk: 50 to <=200
 * High Risk: >200
 * https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds
 * @param {*} props
 */
const AssessmentAdvisory = (props) => {
  const assessment = props.assessment;
  const county = props.county;
  const stateUSA = props.stateUSA;

  const getColor = (assessment) => {
    const assessmentNum = Number(assessment);
    if (assessmentNum < 4) {
      return "green";
    } else if (assessmentNum >= 4 && assessmentNum <= 8) {
      return "orange";
    } else if (assessmentNum > 8) {
      return "red";
    } else {
      return "black";
    }
  };

  const getRiskCategory = (assessment, whiteText) => {
    const assessmentNum = Number(assessment);
    const risk = {
      minimal: ["Minimal Risk", "green"],
      moderate: ["Moderate Risk", "orange"],
      significant: ["Significant Risk", "red"],
    };

    let assignedRisk;

    if (assessmentNum < 4) {
      assignedRisk = risk.minimal;
    } else if (assessmentNum >= 4 && assessmentNum <= 8) {
      assignedRisk = risk.moderate;
    } else {
      assignedRisk = risk.significant;
    }

    if (whiteText) {
      assignedRisk[1] = "white";
    }

    return <span style={{ color: assignedRisk[1] }}>{assignedRisk[0]}</span>;
  };

  return (
    <div className="advisory-overview">
      <div
        className="primary-advisory"
        style={{ backgroundColor: getColor(assessment) }}
      >
        {getRiskCategory(assessment, true)}
      </div>
      <div className="detailed-assessment">
        <div style={{ flex: 1 }}>
          <span className="bold" style={{ color: getColor(assessment) }}>
            {assessment}
          </span>
          <span>
            <p className="bold">
              estimated new cases on average in the last 14 days per 100,000
              people. <br />
              This indicates {getRiskCategory(assessment)} for Covid-19 exposure
              in schools within {county}, {stateUSA}.
            </p>
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <span className="green">Minimal Risk</span>: Less than 4 new cases on
          average in the last 14 days per 100,000 people in this county
          <hr />
          <span className="orange">Moderate Risk</span>: 4-8 new cases on
          average in the last 14 days per 100,000 people in this county
          <hr />
          <span className="red">Significant Risk</span>: More than 8 new cases
          on average in the last 14 days per 100,000 people in this county
          <br />
        </div>
      </div>
    </div>
  );
};

AssessmentAdvisory.propTypes = {
  assessment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AssessmentAdvisory;
