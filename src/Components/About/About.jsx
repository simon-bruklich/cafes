import React from "react";
import AboutText from "./AboutText";

const About = () => {
  return (
    <div className="about-disclaimer">
      <h1 className="about-disclaimer-header">About</h1>
      <AboutText
        aboutText="about-text"
        aboutSubHeader="about-sub-header"
      ></AboutText>
    </div>
  );
};

export default About;
