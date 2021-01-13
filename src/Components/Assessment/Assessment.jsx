import React, { useEffect, useState } from "react";
import AssessmentAdvisory from "./AssessmentAdvisory";
import AssessmentMoreInfo from "./AssessmentMoreInfo";
import LineGraph from "../LineGraph";

// NOTE: this key is NOT sensitive. Cafes will even work without this key.
// It is used as a courtesy to the U.S. Census to assist their data analytics.
const CENSUS_API_KEY = "4ea13d96102d350d26d2f58793cb843a11f667b2";

// TODO: refactor component, elevate new cases

const Assessment = (props) => {
  const [population, setPopulation] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [lastTwoWeeks, setLastTwoWeeks] = useState(null);
  const data = props.aggregation;

  // Calculate population
  useEffect(() => {
    async function doWork() {
      if (
        typeof props.aggregation === "object" &&
        props.aggregation.length !== 0 &&
        !population
      ) {
        const data = props.aggregation;
        const fips = data[data.length - 1].fips;
        const pop = await getPopulation(fips);
        setPopulation(pop);
      }
    }
    doWork();
  }, [population, props.aggregation]);

  // Calculate average
  useEffect(() => {
    if (lastTwoWeeks) {
      const fips = data[data.length - 1].fips;
      const average = computeAverage(lastTwoWeeks, fips, population);
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
      "Active Cases": day.cases,
    }));
    // Skip first bootstrap day
    graphData.shift();
  }

  return (
    <div className="assessment">
      {lastTwoWeeks && (
        <div>
          <LineGraph
            data={graphData}
            keyName={"date"}
            lineNames={["Active Cases"]}
          ></LineGraph>
          <AssessmentAdvisory
            assessment={assessment}
            county={props.county}
            stateUSA={props.stateUSA}
          ></AssessmentAdvisory>
          <AssessmentMoreInfo lastTwoWeeks={lastTwoWeeks}></AssessmentMoreInfo>
        </div>
      )}
    </div>
  );
};

// Dataset must be presented in chronological order
const computeAverage = (dataSet, fips, population) => {
  const newCasesByDay = [];

  // Skip the first data point;
  // It is only used as a baseline for calculating new cases on next day
  for (let i = 1; i < dataSet.length; i++) {
    const casesBaseLine = dataSet[i - 1].cases;
    const deathsBaseLine = dataSet[i - 1].deaths;

    const deltaCasesToday = dataSet[i].cases - casesBaseLine;
    const deltaDeathsToday = dataSet[i].deaths - deathsBaseLine;

    const deathsAndRecoveries =
      estimateRecoveries(deltaDeathsToday) + deltaDeathsToday;

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

// String input
async function getPopulation(fips) {
  let url = "https://api.census.gov/data/2019/pep/charagegroups?get=POP&";
  // First 2 digits are state ID
  const stateID = fips.substring(0, 2);
  // Last 4 digits are county ID
  const countyID = fips.substring(2, 6);
  url += `for=county:${countyID}&in=state:${stateID}`;
  const urlWithKey = url + `&key=${CENSUS_API_KEY}`;
  // TODO: (another .catch?)check response.status == 200, else error

  const fetchPopulation = () => {
    return new Promise((resolve, reject) =>
      fetch(urlWithKey)
        .then((response) => response.json())
        .then((json) => resolve(json[1][0]))
        // Fallback: try accessing without API key (each user's IP is only allowed 500 requests per day)
        .catch(
          (err) =>
            // TODO: double .then as above and JSON parse
            resolve(console.log(err))
          //fetch(url).then((response) => parsePopulation(response.text()))
        )
    );
  };
  const population = fetchPopulation();

  return population;
}

export default Assessment;
