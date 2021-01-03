import Papa from "papaparse";

export default aggregate;

const URL =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

// TODO: optimization: stream in data
async function parseData(data, county, state) {
  let relevant = [];
  return new Promise((resolve, reject) => {
    const enCollator = new Intl.Collator("en", {
      ignorePunctuation: true,
      sensitivity: "base",
    });
    for (let i = 0; i < data.length; i++) {
      const cell = data[i];
      if (
        enCollator.compare(cell["county"], county) === 0 &&
        enCollator.compare(cell["state"], state) === 0
      ) {
        relevant.push(cell);
      }
    }

    if (relevant.length) {
      resolve(relevant);
    } else {
      reject("No data found for given location");
    }
  });
}

async function aggregate(county, state) {
  const downloadData = () => {
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

  try {
    const promisedData = await downloadData();
    return await parseData(promisedData, county, state);
  } catch (e) {
    return new Error(e);
  }
}
