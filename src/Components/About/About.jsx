import React from 'react';
import AboutText from './AboutText';

/**
 * About page, containing the given AboutText content.
 */
const About = () => {
  return (
    <div className="about-disclaimer">
      <h1 className="about-disclaimer-header">About</h1>
      <AboutText />
    </div>
  );
};

export default About;
