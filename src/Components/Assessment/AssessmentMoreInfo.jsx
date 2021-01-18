import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, useAccordionToggle, AccordionContext } from 'react-bootstrap';
import LineGraph from '../LineGraph';

/**
 * Provides the secondary assessments at the bottom of the assessments page that can be viewed by
 * toggling the accordion component.
 * @param {*} props The Covid-19 statistics of the given location for the last two weeks.
 */
const AssessmentMoreInfo = (props) => {
  // Used to scroll into view
  const viewRef = React.useRef(null);
  const lastTwoWeeks = props.lastTwoWeeks.slice();
  let lastTwoWeeksShift = props.lastTwoWeeks.slice();
  lastTwoWeeksShift.shift();

  const twoWeeksDeaths = lastTwoWeeksShift.map((day) => ({
    date: day.date,
    'Cumulative Deaths': day.deaths,
  }));

  const twoWeeksNewCases = calcNewDailyStat(lastTwoWeeks, 'Cases');
  const twoWeeksNewDeaths = calcNewDailyStat(lastTwoWeeks, 'Deaths');

  return (
    <Accordion className="chart">
      <Card>
        <ContextAwareToggle viewRef={viewRef} eventKey="0" />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="bg-gray">
            <p>Note: Data subject to change, especially for more recent days as figures continue to be reported</p>
            <LineGraph
              title={'New Cases'}
              viewRef={viewRef}
              data={twoWeeksNewCases}
              keyName={'date'}
              lineNames={['New Cases']}
              paddingTop="padding-top-15"
            ></LineGraph>
            <LineGraph
              title={'New Deaths'}
              data={twoWeeksNewDeaths}
              keyName={'date'}
              lineNames={['New Deaths']}
              paddingTop="padding-top-15"
            ></LineGraph>
            <LineGraph
              title={'Cumulative Deaths'}
              data={twoWeeksDeaths}
              keyName={'date'}
              lineNames={['Cumulative Deaths']}
              paddingTop="padding-top-15"
            ></LineGraph>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

/**
 * Provides self-aware Accordion component that knows its
 * open/close state and can automatically scroll user's view accordingly.
 * @param {*} object Object containing metadata and hooks for the HTML Accordion component.
 * @return {*} JSX containing self-aware Accordion component.
 */
function ContextAwareToggle({ viewRef, children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

  const isCurrentEventKey = currentEventKey === eventKey;

  /**
   * Scrolls the user's view to smoothly center on the Accordion component when opened.
   */
  const scrollToAccordion = () => {
    if (viewRef.current && !isCurrentEventKey) {
      viewRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  };

  return (
    <Accordion.Toggle
      onClick={(eventKey, func) => {
        setTimeout(scrollToAccordion, 400);
        return decoratedOnClick(eventKey, func);
      }}
      as={Card.Header}
      className="cursor-pointer"
    >
      Click to Show {isCurrentEventKey ? 'Less ' : 'Additional '}
      Statistics
      {children}
    </Accordion.Toggle>
  );
}

/**
 * Calculates daily new statistic for each respective day that was given in the array.
 * @param {*} lastTwoWeeks Array of objects with metrics representing impact of virus on each respective day.
 * @param {*} name Name of daily new statistic to evaluate.
 * @return [{*}] Array of objects representing new cases for each respective day.
 */
const calcNewDailyStat = (lastTwoWeeks, name) => {
  let dailyChange = [];
  const firstDayBootstrap = lastTwoWeeks.shift();

  for (let i = 0; i < lastTwoWeeks.length; i++) {
    const day = lastTwoWeeks[i];
    const yesterday = i > 0 ? lastTwoWeeks[i - 1] : firstDayBootstrap;

    dailyChange.push({
      date: day.date,
      [`New ${name}`]: Math.max(day[name.toLowerCase()] - yesterday[name.toLowerCase()], 0),
    });
  }

  return dailyChange;
};

AssessmentMoreInfo.propTypes = {
  assessment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lastTwoWeeks: PropTypes.array,
};

export default AssessmentMoreInfo;
