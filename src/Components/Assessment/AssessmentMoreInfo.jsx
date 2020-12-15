import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  Card,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import LineGraph from "../LineGraph";

const AssessmentMoreInfo = (props) => {
  // Used to scroll into view
  const viewRef = React.useRef(null);
  const assessment = props.assessment;
  const lastTwoWeeks = props.lastTwoWeeks;
  let lastTwoWeeksShift = props.lastTwoWeeks;
  lastTwoWeeksShift.shift();

  // Ignore first day in array (first item is used as baseline for new cases)
  const twoWeeksCases = lastTwoWeeksShift.map((day) => ({
    date: day.date,
    "Active Cases": day.cases,
  }));

  const twoWeeksDeaths = lastTwoWeeksShift.map((day) => ({
    date: day.date,
    "Cumulative Deaths": day.deaths,
  }));

  return (
    <Accordion className="chart">
      <Card>
        <ContextAwareToggle viewRef={viewRef} eventKey="0" />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="bg-gray">
            <LineGraph
              viewRef={viewRef}
              data={twoWeeksCases}
              keyName={"date"}
              lineNames={["Active Cases"]}
            ></LineGraph>
            <LineGraph
              data={twoWeeksDeaths}
              keyName={"date"}
              lineNames={["Cumulative Deaths"]}
            ></LineGraph>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

/**
 * TODO: docs
 * @param {*} param0
 */
function ContextAwareToggle({ viewRef, children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  const scrollToBottom = () => {
    if (viewRef.current && !isCurrentEventKey) {
      viewRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Accordion.Toggle
      onClick={(eventKey, func) => {
        setTimeout(scrollToBottom, 400);
        return decoratedOnClick(eventKey, func);
      }}
      as={Card.Header}
      className="cursor-pointer"
    >
      Click to Show {isCurrentEventKey ? "Less " : "Additional "}
      Statistics
      {children}
    </Accordion.Toggle>
  );
}

AssessmentMoreInfo.propTypes = {
  assessment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lastTwoWeeks: PropTypes.array,
};

export default AssessmentMoreInfo;
