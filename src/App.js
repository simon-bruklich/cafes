import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import aggregate from "./aggregate";
import Assessment from "./Components/Assessment/Assessment";
import Cases from "./Components/Cases";
import LocationForm from "./Components/LocationForm/LocationForm";
import Navbar from "./Components/Navbar";
import Introduction from "./Components/Introduction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stylesheets/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// TODO: lint all files

function App() {
  const [county, setCounty] = useState(null);
  const [stateUSA, setStateUSA] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function doWork() {
      let response = await aggregate(county, stateUSA);
      setData(response);
    }

    if (county) {
      doWork();
    }
  }, [county]);

  const results = () => {
    if (county && stateUSA) {
      return (
        <div className="App">
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
    <Router>
      <Route path="/">
        <Navbar></Navbar>
      </Route>
      <Switch>
        <Route exact path="/">
          {results()}
        </Route>
        <Route exact path="/disclaimer">
          {/* <Disclaimer></Disclaimer> */}
        </Route>
        <Route exact path="/about">
          {/* <About></About> */}
        </Route>
        {/* <Route exact path="/Assessment">

        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
