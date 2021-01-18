import React from "react";

/**
 * Text content of the "About" page.
 */
const AboutText = () => {
  // CSS for about page, can be modified (added/removed) here
  const aboutText = "about-text";
  const aboutSubHeader = "about-sub-header";

  return (
    <div className={aboutText}>
      This website, Cafés (Covid-19 Advisory for Educational Systems), was
      designed and developed by Simon Bruklich through a combination of React
      and JavaScript. The site was built completely from scratch, without the
      use of a template.
      {<h3 className={aboutSubHeader}>Overview</h3>}
      Cafés uses Covid-19 data provided by{" "}
      {
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          John Hopkins University
        </a>
      }
      . This data is updated daily for all counties in the United States of
      America. Cafés will use the CDC's{" "}
      {
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds"
        >
          Indicators for Dynamic School Decision-Making
        </a>
      }{" "}
      to present an analysis for the user. Cafés will then analyze this data in
      the context of the most recent county population provided by the{" "}
      {
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.census.gov/"
        >
          US Census
        </a>
      }
      .{<h3 className={aboutSubHeader}>Accuracy</h3>}
      It is important to remember that Cafés provides a best-effort estimate
      that is updated daily using currently available data. Although there are
      many factors that the CDC uses, Cafés only analyzes based on the first
      variable: new Covid-19 cases. For more information, please read our{" "}
      {
        <a target="_blank" rel="noopener noreferrer" href="/disclaimer">
          Disclaimer
        </a>
      }
      .{<h3 className={aboutSubHeader}>Mobile Compatability</h3>}
      This site was designed with various screen sizes in mind ranging from
      large desktop monitors to laptop screens and to small mobile devices.
      {<h3 className={aboutSubHeader}>Performance Considerations</h3>}
      Cafés runs completely locally on your machine and does not rely on servers
      to pre-process data. Because of this, Cafés is very resilient against
      Denial-of-Service and performance loss due to high traffic. However, this
      also means that Cafés requires a significant amount of data to be
      downloaded and processed; this means that loading times are highly
      dependent on the performance of the user's internet connection and local
      machine. Future plans for this project involve integration with Heroku or
      other Cloud platforms to store and pre-process data before sending results
      to the user which should significantly improve load times.
      {<h3 className={aboutSubHeader}>Contact Us</h3>}
      Please report any issues on the Github page for this project. If this tool
      has helped you or if you have questions, feel free to contact me at{" "}
      {typeof window !== "undefined" && (
        <a href={"mailto: bruklich.s+cafes@northeastern.edu"}>
          bruklich.s+cafes@northeastern.edu
        </a>
      )}
      .
    </div>
  );
};

export default AboutText;
