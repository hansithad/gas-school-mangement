import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import server from '../server';
import M from 'materialize-css';


const SchoolManual = ({ currentUser ,smAccepted,smUrl,acceptSchoolManual })=>{

  const clickHandler = ()=>{
    acceptSchoolManual({studentId:currentUser.studentId});
  };

  const userInteractionsSection = (smAccepted)=>{
    if(!smAccepted){
      return ( <div className="row text-center">
        <div className="btn" onClick={clickHandler}>I Accept all terms and conditions</div>
      </div>)
    }
    else {
      return( <div className="row text-center">
        <h4 style={{color:'#1BAC31'}} ><span>&#10003;</span> You have already accepted</h4>
      </div>)
    }
  };

  return (
    <div className="white">
      <SectionHeader title="school manual" />
      <div className="container">
        <div className="row">
          <div className="col s12 m12 text-center">
            <div>
              <h6>School Manual</h6>
            </div>
            <div>
              <iframe
                width={`100%`}
                height={`600px`}
                frameBorder="0"
                src={smUrl}>
                Loading…
              </iframe>
            </div>


            {userInteractionsSection(smAccepted)}

            </div>
        </div>
      </div>
    </div>
  );


};


export default SchoolManual;