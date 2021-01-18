import React from 'react';
import PropTypes from 'prop-types';

const altYellow = '#f7c836';

/**
 * Provides user with a recommendation based on CDC guidelines:
 * Lowest Risk: <5
 * Lower Risk: 5 to <20
 * Moderate Risk: 20 to <50
 * Higher Risk: 50 to <=200
 * High Risk: >200
 * https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds
 * @param {*} props Completed assessment of location as well as location data.
 */
const AssessmentAdvisory = (props) => {
  const assessment = props.assessment;
  const county = props.county;
  const stateUSA = props.stateUSA;

  const getColor = (assessment) => {
    const assessmentNum = Number(assessment);
    if (assessmentNum < 5) {
      return 'green';
    } else if (assessmentNum >= 5 && assessmentNum < 20) {
      return 'yellowGreen';
    } else if (assessmentNum >= 20 && assessmentNum < 50) {
      return altYellow;
    } else if (assessmentNum >= 50 && assessmentNum <= 200) {
      return 'orange';
    } else if (assessmentNum > 200) {
      return 'red';
    } else {
      return 'black';
    }
  };

  const getRiskCategory = (assessment, whiteText) => {
    const assessmentNum = Number(assessment);
    const risk = {
      lowest: ['Lowest Risk', 'green'],
      lower: ['Lower Risk', 'yellowGreen'],
      moderate: ['Moderate Risk', altYellow],
      higher: ['Higher Risk', 'orange'],
      highest: ['Highest Risk', 'red'],
    };

    let assignedRisk;

    if (assessmentNum < 5) {
      assignedRisk = risk.lowest;
    } else if (assessmentNum >= 5 && assessmentNum < 20) {
      assignedRisk = risk.lower;
    } else if (assessmentNum >= 20 && assessmentNum < 50) {
      assignedRisk = risk.moderate;
    } else if (assessmentNum >= 50 && assessmentNum <= 200) {
      assignedRisk = risk.higher;
    } else {
      assignedRisk = risk.highest;
    }

    if (whiteText) {
      assignedRisk[1] = 'white';
    }

    return <span style={{ color: assignedRisk[1] }}>{assignedRisk[0]}</span>;
  };

  return (
    <div className="advisory-overview">
      <div className="primary-advisory" style={{ backgroundColor: getColor(assessment) }}>
        {getRiskCategory(assessment, true)}
      </div>
      <div className="detailed-assessment">
        <div style={{ flex: 1 }}>
          <span className="bold" style={{ color: getColor(assessment) }}>
            {assessment}
          </span>
          <span>
            <p className="bold">
              estimated new cases on average in the last 14 days per 100,000 people. <br />
              This indicates {getRiskCategory(assessment)} for Covid-19 exposure in schools within {county}, {stateUSA}{' '}
              according to CDC guidelines:
            </p>
          </span>
        </div>
        <div className="assessment-guide" style={{ flex: 1 }}>
          <span className="red font-bold">Highest Risk</span>: More than 200 new cases on average in the last 14 days
          per 100,000 people in this county
          <hr />
          <span className="orange font-bold">Higher Risk</span>: Less or equal to 200 new cases on average in the last
          14 days per 100,000 people in this county
          <hr />
          <span className="yellow font-bold">Moderate Risk</span>: Less than 50 new cases on average in the last 14 days
          per 100,000 people in this county
          <hr />
          <span className="yellow-green font-bold">Lower Risk</span>: Less than 20 new cases on average in the last 14
          days per 100,000 people in this county
          <hr />
          <span className="green font-bold">Lowest Risk</span>: Less than 5 new cases on average in the last 14 days per
          100,000 people in this county
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
