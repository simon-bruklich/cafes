import Papa from "papaparse";

export default aggregate;

const URL =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

async function parseData(data, county, state) {
  let relevant = [];
  return new Promise((resolve, reject) => {
    if (!data) {
      reject("Unable to gather data, please try again later");
    }

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
    return new Promise((resolve, reject) => {
      Papa.parse(URL, {
        download: true,
        worker: true,
        error: (e) => {
          reject(e);
        },
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
      });
    });
  };

  const promisedData = await downloadData().catch((e) =>
    console.error("Unable to fetch or parse Covid-19 data: ", e)
  );

  return await parseData(promisedData, county, state);
}
