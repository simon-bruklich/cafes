import React, { useState, useCallback } from 'react';
import DropdownStateUSA from './DropdownStateUSA';
import { Button } from 'react-bootstrap';
import DisclaimerModal from '../Modal';

/**
 * Update County location input as user types in String on form.
 * @param {*} initialValue Current value of County location.
 */
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

/**
 * Provides the location form in which the user can provide desired location data.
 * // Security Note: JSX is already sanitized, no need to re-sanitize input
 * @param {*} props Value of currently selected U.S. State and functions to perform when changing county/state.
 */
function LocationForm({ onCountyChange, stateUSA, onStateChange }) {
  const { value: county, bind: bindCounty } = useInput('');
  const [modalShow, setModalShow] = useState(false);

  const handleAcceptModal = useCallback(
    (event) => {
      // Normalize case
      const standardCounty = standardizeCounty(county);
      onCountyChange(standardCounty);
    },
    [onCountyChange, county]
  );

  /**
   * Cancel modal if user does not agree to disclaimer.
   */
  const handleCancelModal = () => {
    setModalShow(false);
  };

  /**
   * Display disclaimer pop-up when user submits location form.
   * @param {*} event Submit form page event (refresh page and clear input)
   */
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
        title={'Disclaimer'}
        body={disclaimerText}
      ></DisclaimerModal>
      <form className="location" onSubmit={handleFormSubmit}>
        <input
          id="county-name-input"
          className="margin-bottom-15 padding-horizontal-10 input-county"
          autoFocus={true}
          type="text"
          placeholder={county || 'County name...'}
          {...bindCounty}
        />
        <DropdownStateUSA stateUSA={stateUSA} onStateChange={onStateChange}></DropdownStateUSA>
        <Button
          variant="primary"
          type="submit"
          className={stateUSA && county ? 'pulse-btn padding-horizontal-10' : 'padding-horizontal-10'}
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
  const words = county.trim().split(' ');
  const lastWord = words[words.length - 1];

  // Remove word county from end
  if (lastWord.toLowerCase() === 'county') {
    const lastIndex = county.lastIndexOf(' ');
    county = county.substring(0, lastIndex);
  }

  // Adjust case of county
  county = county.charAt(0).toUpperCase() + county.slice(1).toLowerCase();

  return county;
};

// Short disclaimer linking to complete disclaimer
const disclaimerText = (
  <span className="disclaimer-modal">
    This site does not provide medical or health advice. Contact medical professionals for information regarding advice,
    prevention and treatment. For more information, view our complete{' '}
    <a target="_blank" rel="noopener noreferrer" href="/disclaimer">
      disclaimer
    </a>
    .
  </span>
);

export default LocationForm;
