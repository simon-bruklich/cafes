import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylesheets/App.css';
import './Stylesheets/Fade.css';
import LocationModal from './Components/Modal';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import About from './Components/About/About';
import MainPage from './Components/MainPage';

/**
 * Root of application.
 */
function App() {
  const [county, setCounty] = useState(null);
  const [stateUSA, setStateUSA] = useState(null);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeLocation, setFadeLocation] = useState(false);
  const [fadeLoading, setFadeLoading] = useState(false);

  return (
    <div className="main-div">
      {/* Compatability with GH-pages */}
      <HashRouter>
        <Route path="/">
          <Navbar />
        </Route>
        <Switch>
          <Route exact path="/">
            <LocationModal
              show={[modalShow, setModalShow]}
              onAccept={() =>
                modalResolve(setCounty, setStateUSA, setData, setModalShow, setLoading, setFadeLocation, setFadeLoading)
              }
              onCancel={() =>
                modalResolve(setCounty, setStateUSA, setData, setModalShow, setLoading, setFadeLocation, setFadeLoading)
              }
              title="Oops!"
              body={modalShow}
            />
            <MainPage
              county={county}
              setCounty={setCounty}
              stateUSA={stateUSA}
              setStateUSA={setStateUSA}
              fadeLocation={fadeLocation}
              setFadeLocation={setFadeLocation}
              fadeLoading={fadeLoading}
              setFadeLoading={setFadeLoading}
              data={data}
              setData={setData}
              loading={loading}
              setLoading={setLoading}
              setModalShow={setModalShow}
            />
          </Route>
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/about" component={About} />
        </Switch>
        <Route path="/">
          <Footer />
        </Route>
      </HashRouter>
    </div>
  );
}

function modalResolve(...setStates) {
  setStates.forEach((set) => {
    set(false);
  });
}

export default App;
