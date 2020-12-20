import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import aggregate from "./aggregate";
import LocationForm from "./Components/LocationForm/LocationForm";
import Cases from "./Components/Cases";
import Assessment from "./Components/Assessment/Assessment";
import LocationModal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Introduction from "./Components/Introduction";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stylesheets/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Disclaimer from "./Components/Disclaimer";

// TODO: lint all files

function App() {
  const [county, setCounty] = useState(null);
  const [stateUSA, setStateUSA] = useState(null);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function doWork() {
      // let response = await aggregate(county, stateUSA);
      aggregate(county, stateUSA)
        .catch((err) => {
          console.error(err);
          setModalShow(true);
        })
        .then((response) => setData(response));
    }

    if (county) {
      doWork();
    }
  }, [county, stateUSA]);

  const results = () => {
    if (county && stateUSA) {
      return (
        <div className="App">
          <LocationModal
            show={modalShow}
            onAccept={() =>
              modalResolve(setModalShow, setCounty, setStateUSA, setData)
            }
            onCancel={() =>
              modalResolve(setModalShow, setCounty, setStateUSA, setData)
            }
            title={"Oops! Location not found"}
            body={
              'We were unable to find any data for this location.\nPlease make sure you have entered the correct location and try again\n(e.g. type "Suffolk" for Suffolk County).'
            }
          ></LocationModal>
          <Cases aggregation={data} location={[county, stateUSA]}></Cases>
          <Assessment
            aggregation={data}
            county={county}
            stateUSA={stateUSA}
          ></Assessment>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="center">
            <Introduction></Introduction>
            <LocationForm
              onCountyChange={setCounty}
              stateUSA={stateUSA}
              onStateChange={setStateUSA}
            ></LocationForm>
          </div>
        </div>
      );
    }
  };

  // TODO: disclaimer and About pages
  return (
    <div className="main-div">
      <Router>
        <Route path="/">
          <Navbar />
        </Route>
        <Switch>
          <Route exact path="/">
            {results()}
          </Route>
          <Route exact path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route exact path="/about">
            {/* <About></About> */}
          </Route>
        </Switch>
        <Route path="/">
          <Footer />
        </Route>
      </Router>
    </div>
  );
}

function modalResolve(setModalShow, setCounty, setStateUSA, setData) {
  setCounty(false);
  setStateUSA(false);
  setData(false);
  setModalShow(false);
}

export default App;
