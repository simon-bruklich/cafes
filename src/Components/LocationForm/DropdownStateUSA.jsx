import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Dropdown menu to select U.S. State.
 * @param {*} Props Selected State and function to perform on U.S. State input change.
 */
function DropdownStateUSA({ stateUSA, onStateChange }) {
  const displayStateUSA = stateUSA || "Select State";

  return (
    <Dropdown
      className="margin-bottom-15 padding-horizontal-10"
      onSelect={(e) => onStateChange(e)}
      drop="down"
    >
      <Dropdown.Toggle id="locations-dropdown" variant="primary">
        {displayStateUSA}
      </Dropdown.Toggle>
      <Dropdown.Menu flip={false}>
        {Object.keys(states).map((abbreviation) => (
          <Dropdown.Item key={abbreviation} eventKey={states[abbreviation]}>
            {abbreviation}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  ME: "Maine",
  MD: "Maryland",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export default DropdownStateUSA;
