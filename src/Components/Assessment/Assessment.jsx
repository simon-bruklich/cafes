import React, { useEffect, useState } from 'react';
import AssessmentAdvisory from './AssessmentAdvisory';
import AssessmentMoreInfo from './AssessmentMoreInfo';
import LineGraph from '../LineGraph';

/**
 * Provides the main assessment page for the user based on given location.
 * @param {*} props county location, state location, aggregated data set, and population.
 */
const Assessment = (props) => {
  const [assessment, setAssessment] = useState(null);
  const [lastTwoWeeks, setLastTwoWeeks] = useState(null);
  const { data } = props;
  const { population } = props;

  // Calculate average
  useEffect(() => {
    if (lastTwoWeeks) {
      const { fips } = data[data.length - 1];
      const average = computeAverage(lastTwoWeeks, fips, population);
      // Done with all downloading at this point
      setAssessment(Math.round(average));
    }
  }, [data, lastTwoWeeks, population]);

  // Gather last two weeks + 1 day
  if (population && !lastTwoWeeks) {
    const workingSet = [];
    const lastIndex = data.length - 1;
    for (let i = lastIndex; i > data.length - 16; i--) {
      workingSet.unshift(data[i]);
    }
    setLastTwoWeeks(workingSet);
  }

  let graphData;

  // Compute main graph, remove leading bootstrap day
  if (lastTwoWeeks) {
    graphData = lastTwoWeeks.map((day) => ({
      date: day.date,
      'Active Cases': day.cases,
    }));
    // Skip first bootstrap day
    graphData.shift();
  }

  return (
    <div className="assessment">
      {lastTwoWeeks && (
        <div>
          <LineGraph data={graphData} keyName="date" lineNames={['Active Cases']} />
          <AssessmentAdvisory assessment={assessment} county={props.county} stateUSA={props.stateUSA} />
          <AssessmentMoreInfo lastTwoWeeks={lastTwoWeeks} />
        </div>
      )}
    </div>
  );
};

/**
 * Calculate the 14-day new average cases statistics from which a CDC recommendation
 * may be derived.
 *
 * Note: Dataset must be presented in chronological order
 * @param {*} dataSet Given data set to compute average from.
 * @param {*} fips Fips location code of county/state.
 * @param {*} population Given population statistics to compute average from.
 */
const computeAverage = (dataSet, fips, population) => {
  const newCasesByDay = [];

  // Skip the first data point;
  // It is only used as a baseline for calculating new cases on next day
  for (let i = 1; i < dataSet.length; i++) {
    const casesBaseLine = dataSet[i - 1].cases;
    const deathsBaseLine = dataSet[i - 1].deaths;

    const deltaCasesToday = dataSet[i].cases - casesBaseLine;
    const deltaDeathsToday = dataSet[i].deaths - deathsBaseLine;

    const deathsAndRecoveries = estimateRecoveries(deltaDeathsToday) + deltaDeathsToday;

    newCasesByDay.push(Math.max(deltaCasesToday - deathsAndRecoveries, 0));
  }

  const totalNewCases = newCasesByDay.reduce((a, b) => a + b, 0);

  // Calculate CDC statistic: (x / 100,000) = (new cases in last 14 days / County population);
  return (totalNewCases * 100000) / population;
};

/**
 * Estimate the amount of people that have recovered from Covid-19.
 * This estimate is based on a 98% recovery rate.
 * This was isolated into its own function to bring awareness to and compartmentalize the
 * estimation that has to be made in calculation, due to a lack of statistics for "daily new cases" by County.
 * Simply taking the change in total cases does not work because "new cases"
 * may also be replacing deaths and recoveries in the "total cases" count.
 * Additionally, divide by 14 days as medical experts report 1-2 week recovery time for Covid-19.
 * @param {Integer} deltaDeathsToday Difference in death's between this date and the day prior.
 * @returns {Number} Estimated number of recoveries.
 */
function estimateRecoveries(deltaDeathsToday) {
  return deltaDeathsToday / 0.02 / 14;
}

export default Assessment;
