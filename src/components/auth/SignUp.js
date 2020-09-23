import React, { useState } from 'react';
import { signUp } from '../../store/actions/authActions'
import { connect } from 'react-redux'

import './SignUp.css'
import pinkRectangle from './pinkRectangle.jpg'

const SignUp = ({ signUp, authError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    signUp({ email, password, firstName, lastName })
  }

  return (
    <div className="signUpMain">
      <div className="signUp">
        <form onSubmit={onSubmit}>
          <h5>Sign Up</h5>
          <div className="signUpEmail">
            <label>Email</label>
            <input style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey' }} value={email} onChange={updateEmail} />
          </div>
          <div className="signUpPassword">
            <label>Password</label>
            <input type="password" style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey', borderRadius: '10px', padding: '0px 5px', color: 'rgb(248, 98, 131)' }} onChange={updatePassword} />
          </div>
          <div className="signUpOther">
            <label>First Name</label>
            <input style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey' }} onChange={updateFirstName} />
          </div>
          <div className="signUpOther">
            <label>Last Name</label>
            <input style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey' }} onChange={updateLastName} />
          </div>
          <div className="signUpLogin">
            <button>Sign Up</button>
            <div>
              {authError ? <p style={{ color: 'red' }}> {authError}</p> : null}
            </div>
          </div>
          <div className="signUpAccountAlready">
            <p>Already have an account?</p><a href='/signIn'>Sign In</a>
          </div>
        </form>

      </div>
      <div className="SignUpImages">
        <img src={pinkRectangle} />
      </div>
      <div className="SignUpImages2">
        <img src={pinkRectangle} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
