# Cafés <span align="center">![Build and Deploy](https://github.com/simon-bruklich/cafes/workflows/Build%20and%20Deploy/badge.svg?event=push) </span>

Cafés (Covid-19 Advising For Educational Systems) provides school administrators, teachers, students, parents and many others with a Covid-19 risk assessment for schools in the given county. The Covid-19 risk assessment is generated from data that is updated daily and provides an estimated risk of Covid-19 transmission in schools based on [CDC guidelines](https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds).

## Built With

- [React](http://www.dropwizard.io/1.0.2/docs/) - Front-end web framework

## About

This website, Cafés (Covid-19 Advisory for Educational Systems), was designed and developed by Simon Bruklich through a combination of React and JavaScript. The site was built completely from scratch, without the use of a template.

## Overview

Cafés uses Covid-19 data provided by [John Hopkins University](https://github.com/CSSEGISandData/COVID-19). This data is updated daily for all counties in the United States of America. Cafés will use the CDC's [Indicators for Dynamic School Decision-Making](https://www.cdc.gov/coronavirus/2019-ncov/community/schools-childcare/indicators.html#thresholds) to present an analysis for the user. Cafés will then analyze this data in the context of the most recent county population provided by the [US Census](https://www.census.gov/).

## Accuracy

It is important to remember that Cafés provides a best-effort estimate that is updated daily using currently available data. Although there are many factors that the CDC uses, Cafés only analyzes based on the first variable: new Covid-19 cases. For more information, please read our [Disclaimer](https://simon-bruklich.github.io/cafes/#/disclaimer).

## Mobile Compatability

This site was designed with various screen sizes in mind ranging from large desktop monitors to laptop screens and to small mobile devices.

## Performance Considerations

Cafés runs completely locally on your machine and does not rely on servers to pre-process data. Because of this, Cafés is very resilient against Denial-of-Service and performance loss due to high traffic. However, this also means that Cafés requires a significant amount of data to be downloaded and processed; this means that loading times are highly dependent on the performance of the user's internet connection and local machine. Future plans for this project involve integration with Heroku or other Cloud platforms to store and pre-process data before sending results to the user which should significantly improve load times.

## Contact Us

Please report any issues on the Github page for this project. If this tool has helped you or if you have questions, feel free to contact me at bruklich.s+cafes@northeastern.edu.

## Copyright

Simon Bruklich - All Rights Reserved
