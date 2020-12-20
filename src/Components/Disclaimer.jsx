import React, { useRef, useLayoutEffect, useState } from "react";
import GeneralDisclaimer from "./Disclaimers/General";
import medicalHealthDisclaimer from "./Disclaimers/Medical";

const Disclaimer = () => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  console.log("simon height: ", dimensions.height);

  return (
    <div ref={targetRef} className="disclaimer">
      <h1 className="disclaimer-header">Disclaimer</h1>
      <div className="disclaimer-text">
        <p>{GeneralDisclaimer}</p>
        <p>{medicalHealthDisclaimer}</p>
      </div>
    </div>
  );
};

export default Disclaimer;
