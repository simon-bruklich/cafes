import React from "react";
import GeneralDisclaimer from "./Disclaimers/General";
import medicalHealthDisclaimer from "./Disclaimers/Medical";

const Disclaimer = () => {
  return (
    <div className="disclaimer-wrap">
      <div className="disclaimer">
        <h1 className="disclaimer-header">Disclaimer</h1>
        <div className="disclaimer-text">
          <p>{GeneralDisclaimer}</p>
          <p>{medicalHealthDisclaimer}</p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
