import React, { useState, useEffect } from "react";
import Cafes from "./Images/Cafes.png";
import aggregate from "./aggregate";
import LocationForm from "./Components/LocationForm/LocationForm";
import Cases from "./Components/Cases";
import Assessment from "./Components/Assessment/Assessment";
import LocationModal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import Introduction from "./Components/Introduction";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stylesheets/App.css";
import "./Stylesheets/Fade.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Disclaimer from "./Components/Disclaimer/Disclaimer";
import About from "./Components/About/About";
import Loading from "./Components/Loading";
// import { Spinner } from "react-bootstrap";

// TODO: lint all files
// TODO: condense imports?

function App() {
  const [county, setCounty] = useState(null);
  const [stateUSA, setStateUSA] = useState(null);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeLocation, setFadeLocation] = useState(false);
  const [fadeLoading, setFadeLoading] = useState(false);

  useEffect(() => {
    async function doWork() {
      aggregate(county, stateUSA)
        .catch((err) => {
          setModalShow(true);
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
  }, [county, stateUSA]);

  // TODO: refactor into separate file
  const results = () => {
    if (fadeLocation || !(county && stateUSA)) {
      // Location Search
      return (
        <div>
          <div className={fadeLocation ? "App fade-out" : "App"}>
            <div className="center welcome-intro">
              <Welcome />
              <LocationForm
                onCountyChange={setCounty}
                stateUSA={stateUSA}
                onStateChange={setStateUSA}
              ></LocationForm>
              <Introduction />
              <img className="logo" draggable="false" src={Cafes} alt="Logo" />
            </div>
          </div>
        </div>
      );
    } else if (county && stateUSA) {
      // Loading spinner
      if (loading) {
        return <Loading fadeLoading={fadeLoading}></Loading>;
      } else {
        // Cases Page
        return (
          <div className={loading ? "App" : "App fade-in"}>
            <Cases aggregation={data} location={[county, stateUSA]}></Cases>
            <Assessment
              aggregation={data}
              county={county}
              stateUSA={stateUSA}
            ></Assessment>
          </div>
        );
      }
    }
  };

  return (
    <div className="main-div">
      <Router>
        <Route path="/">
          <Navbar />
        </Route>
        <Switch>
          <Route exact path="/">
            <LocationModal
              show={[modalShow, setModalShow]}
              onAccept={() =>
                modalResolve(
                  setCounty,
                  setStateUSA,
                  setData,
                  setModalShow,
                  setLoading,
                  setFadeLocation,
                  setFadeLoading
                )
              }
              onCancel={() =>
                modalResolve(
                  setCounty,
                  setStateUSA,
                  setData,
                  setModalShow,
                  setLoading,
                  setFadeLocation,
                  setFadeLoading
                )
              }
              title={"Oops! Location not found"}
              body={
                'We were unable to find any data for this location.\nPlease make sure you have entered the correct location and try again\n(e.g. type "Suffolk" for Suffolk County).'
              }
            ></LocationModal>
            {results()}
          </Route>
          <Route exact path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Route path="/">
          <Footer />
        </Route>
      </Router>
    </div>
  );
}

function modalResolve(...setStates) {
  setStates.forEach((set) => {
    set(false);
  });
}

export default App;
