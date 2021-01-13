import React from "react";
import Cafes from "../Images/Cafes.png";

const Loading = ({ fadeLoading }) => {
  return (
    <div>
      <div className={fadeLoading ? "loading fade-out" : "loading fade-in"}>
        <div className="loading-secondary">
          <div>
            <span className="loading-text">
              Please wait, this may take a moment
            </span>
            {/* <Spinner
              className="loading-spinner"
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            /> */}
          </div>
          <img
            className="loading-logo"
            draggable="false"
            src={Cafes}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
