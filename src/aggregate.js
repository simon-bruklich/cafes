import Papa from "papaparse";

export default aggregate;

const URL =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

let relevant = [];

// TODO: optimization: work backwards and take only last 2 weeks of data
// TODO: optimization: stream in data
function parseData(data, county, state) {
  const enCollator = new Intl.Collator("en", {
    ignorePunctuation: true,
    sensitivity: "base",
  });
  for (let i = 0; i < data.length; i++) {
    const cell = data[i];
    // TODO: ensure that the two strings are equivalent even with different capitalization
    if (
      enCollator.compare(cell["county"], county) === 0 &&
      enCollator.compare(cell["state"], state) === 0
    ) {
      relevant.push(cell);
    }
  }
}

async function aggregate(county, state) {
  const parsed = () => {
    return new Promise((resolve) =>
      Papa.parse(URL, {
        download: true,
        // TODO:
        // error: errorModal(err);
        worker: true,
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
      })
    );
  };

  const promisedData = await parsed();
  parseData(promisedData, county, state);
  return relevant;
}
