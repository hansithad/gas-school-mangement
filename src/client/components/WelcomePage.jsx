import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

const WelcomePage = ({ loginHandler }) => {
  const [altId, setAltId] = useState('');
  const [localId, setLocalId] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();




  const onSubmitHandler = () => {
    console.log('onSubmitHandler is called on valid');
    const result = loginHandler(altId,localId);
    if (result !== 'success') {

    }
  };

  return (
    <div className="full-page absolute dark-grey flex-center-wrapper">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4 className="white-text">Welcome to GAS Webapp</h4>
          </div>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  placeholder="Enter your Alt Id to begin"
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="validate white-text"
                  onChange={e => setAltId(e.target.value)}
                  ref={register({ required: true })}
                />
                {errors.first_name && <p>Alt Id is required</p>}
                <input
                  placeholder="Enter your Local Id"
                  id="local_id"
                  name="local_id"
                  type="text"
                  className="validate white-text"
                  onChange={e => setLocalId(e.target.value)}
                  ref={register({ required: true })}
                />
                {errors.local_id && <p>Local Id is required</p>}
                <button type="submit" className="btn" onClick={handleSubmit(onSubmitHandler)}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col">
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

WelcomePage.propTypes = {
  loginHandler: PropTypes.func,
};
