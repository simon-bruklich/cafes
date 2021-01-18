// NOTE: this key is NOT sensitive. Cafes will even work without this key.
// It is used as a courtesy to the U.S. Census to assist their data analytics.
const CENSUS_API_KEY = '4ea13d96102d350d26d2f58793cb843a11f667b2';

/**
 * Download and parse population statistics from U.S. Census API.
 * @param {*} fips Location data to get statistics from.
 * @param {*} setModalShow Set modal visibility in case of error.
 */
async function fetchPopulation(fips, setModalShow) {
  // Construct URL
  let url = 'https://api.census.gov/data/2019/pep/charagegroups?get=POP&';
  // First 2 digits are state ID
  const stateID = fips.substring(0, 2);
  // Last 4 digits are county ID
  const countyID = fips.substring(2, 6);
  url += `for=county:${countyID}&in=state:${stateID}`;
  const urlWithKey = url + `&key=${CENSUS_API_KEY}`;

  /**
   * Download and parse population statistics for U.S. Census API.
   */
  const getPopulation = () => {
    return new Promise((resolve, reject) =>
      fetch(urlWithKey)
        .then((response) => response.json())
        .then((json) => resolve(json[1][0]))
        // Fallback: try accessing without API key (without API key, each user's IP address is only allowed 500 requests per day)
        .catch((err) => {
          console.error('Error fetching population using Census API key: ', err);
          fetch(url)
            .then((response) => response.json())
            .then((json) => resolve(json[1][0]))
            .catch((e) => {
              console.error('Unable to fetch population from Census.gov: ', e);
              reject(e);
            });
        })
    );
  };

  const population = getPopulation().catch(() =>
    setModalShow('Unable to grab population data from Census.gov, please try again later.')
  );

  return population;
}

export default fetchPopulation;
