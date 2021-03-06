import React from 'react';
import GeneralDisclaimer from './General';
import MedicalHealthDisclaimer from './Medical';

/**
 * Disclaimer page containing a General Disclaimer as well as a Medical Disclaimer.
 */
const Disclaimer = () => {
  return (
    <div className="about-disclaimer">
      <h1 className="about-disclaimer-header">Cafés Disclaimer</h1>
      <div className="disclaimer-text">
        <p>{GeneralDisclaimer}</p>
        <p>{MedicalHealthDisclaimer}</p>
      </div>
    </div>
  );
};

export default Disclaimer;
