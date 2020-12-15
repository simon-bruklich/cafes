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
  const { value: county, bind: bindCounty, reset: resetCounty } = useInput("");
  const [modalShow, setModalShow] = useState(false);

  const handleAcceptModal = useCallback(
    (event) => {
      // Normalize case
      const normalizeCounty =
        county.charAt(0).toUpperCase() + county.slice(1).toLowerCase();
      onCountyChange(normalizeCounty);
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
        show={modalShow}
        onAccept={handleAcceptModal}
        onCancel={handleCancelModal}
        title={"test title modal"}
        body={"Legal and health disclaimer here!"}
      ></DisclaimerModal>
      <form className="location" onSubmit={handleFormSubmit}>
        <input
          id="county-name-input"
          className="margin-bottom-15 padding-horizontal-10 input-county"
          type="text"
          placeholder="County name..."
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
