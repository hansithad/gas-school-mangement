import React, { useState, useEffect } from 'react';
import server from '../server';
import Preloader from './Preloader';
import M from 'materialize-css';

const grey = '#252827';
const green = '#39ff94';
const lightGrey = '#d9d9d9';

const SectionToggleButton = ({ toggle, openSection, section }) => {
  const changeState = () => {
    if (openSection === section) {
      toggle(false);
    } else {
      toggle(section);
    }
  };
  return (
    <div onClick={changeState} className={`section-toggle`}>
      <span className="align-self-center section-toggle-button shadow-center pointer">
        {openSection !== section ? '<' : '>'}{' '}
      </span>
    </div>
  );
};

const Dashboard = ({
  currentUser,
  updateCurrentUser,
}) => {
  //use this to load profile data and set true once all loaded
  const alreadyLoaded = (true);
  const [ready, setReady] = useState(alreadyLoaded);

  useEffect(() => {
    if (!ready) {

    }
  });




  if (ready) {
    console.log('ready');

    return (
      <div className="row flex-center-wrapper">
        <div
          className={`col dashboard-section front `}
        >
          <div className="mindhive-logo">
            <h1>Copesal - ADA</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default Dashboard;
