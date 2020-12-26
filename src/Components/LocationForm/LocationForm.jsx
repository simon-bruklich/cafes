import React, { useState, useCallback } from "react";
import DropdownStateUSA from "./DropdownStateUSA";
import { Button } from "react-bootstrap";
import DisclaimerModal from "../Modal";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export default LocationForm;

// Security Note: JSX is already sanitized, no need to re-sanitize input
function LocationForm({ onCountyChange, stateUSA, onStateChange }) {
  const { value: county, bind: bindCounty } = useInput("");
  const [modalShow, setModalShow] = useState(false);

  const handleAcceptModal = useCallback(
    (event) => {
      // Normalize case
      const standardCounty = standardizeCounty(county);
      onCountyChange(standardCounty);
    },
    [onCountyChange, county]
  );

  const handleCancelModal = () => {
    setModalShow(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setModalShow(true);
  };

  return (
    <div>
      <DisclaimerModal
        show={[modalShow, setModalShow]}
        onAccept={handleAcceptModal}
        onCancel={handleCancelModal}
        title={"Disclaimer"}
        body={disclaimerText}
      ></DisclaimerModal>
      <form className="location" onSubmit={handleFormSubmit}>
        <input
          id="county-name-input"
          className="margin-bottom-15 padding-horizontal-10 input-county"
          autoFocus={true}
          type="text"
          placeholder={county || "County name..."}
          {...bindCounty}
        />
        <DropdownStateUSA
          stateUSA={stateUSA}
          onStateChange={onStateChange}
        ></DropdownStateUSA>
        <Button
          variant="primary"
          type="submit"
          className={
            stateUSA && county
              ? "pulse-btn padding-horizontal-10"
              : "padding-horizontal-10"
          }
          disabled={!(stateUSA && county)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

/**
 * Remove word "county" from end if present and standardize the spelling case of the string.
 * @param {String} county County string to standardize case and spelling of
 */
const standardizeCounty = (county) => {
  const words = county.trim().split(" ");
  const lastWord = words[words.length - 1];

  // Remove word county from end
  if (lastWord.toLowerCase() === "county") {
    const lastIndex = county.lastIndexOf(" ");
    county = county.substring(0, lastIndex);
  }

  // Adjust case of county
  county = county.charAt(0).toUpperCase() + county.slice(1).toLowerCase();

  return county;
};

// Short disclaimer linking to complete disclaimer
const disclaimerText = (
  <span className="disclaimer-modal">
    This site does not provide medical or health advice. Contact medical
    professionals for information regarding advice, prevention and treatment.
    For more information, view our complete{" "}
    <a target="_blank" rel="noopener noreferrer" href="/disclaimer">
      disclaimer
    </a>
    .
  </span>
);
