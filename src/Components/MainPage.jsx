import React, { useEffect } from 'react';
import Welcome from './Welcome';
import Introduction from './Introduction';
import LocationForm from './LocationForm/LocationForm';
import Assessment from './Assessment/Assessment';
import Cases from './Cases';
import Loading from './Loading';
import Cafes from '../Images/Cafes.png';
import aggregate from '../aggregate';

/**
 * Main "home" page containing introduction, location form, loading transition, and final assessment.
 * @param {*} props Passed from App.js, necessary to provide pop-up modals with context.
 */
const MainPage = ({
  county,
  setCounty,
  stateUSA,
  setStateUSA,
  fadeLocation,
  setFadeLocation,
  fadeLoading,
  setFadeLoading,
  data,
  setData,
  loading,
  setLoading,
  setModalShow,
}) => {
  useEffect(() => {
    async function doWork() {
      aggregate(county, stateUSA)
        .catch((err) => {
          console.error('Error aggregating data: ', err);
          setModalShow(
            'We were unable to find any data for this location.\nPlease make sure you have entered the correct location and try again\n(e.g. type "Suffolk" for Suffolk County).'
          );
        })
        .then((response) => {
          setData(response);
          setFadeLoading(true);
          setTimeout(() => {
            setFadeLoading(false);
            setLoading(false);
          }, 1 * 1000);
        });
    }

    if (county && stateUSA) {
      setFadeLocation(true);
      setTimeout(() => {
        setFadeLocation(false);
        setLoading(true);
      }, 1 * 1000);
      doWork();
    }
  }, [county, setData, setFadeLoading, setFadeLocation, setLoading, setModalShow, stateUSA]);

  if (fadeLocation || !(county && stateUSA)) {
    // Location Search
    return (
      <div>
        <div className={fadeLocation ? 'App fade-out' : 'App'}>
          <div className="center welcome-intro">
            <Welcome />
            <LocationForm onCountyChange={setCounty} stateUSA={stateUSA} onStateChange={setStateUSA} />
            <Introduction />
            <img className="logo" draggable="false" src={Cafes} alt="Logo" />
          </div>
        </div>
      </div>
    );
  }
  if (county && stateUSA) {
    // Loading spinner
    if (loading) {
      return <Loading fadeLoading={fadeLoading} />;
    }
    // Cases Page
    return (
      <div className={loading ? 'App' : 'App fade-in'}>
        <Cases aggregation={data} location={[county, stateUSA]} />
        <Assessment setModalShow={setModalShow} aggregation={data} county={county} stateUSA={stateUSA} />
      </div>
    );
  }
};

export default MainPage;
