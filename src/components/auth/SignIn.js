import React, { useState } from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

import './SignIn.css'
import pinkRectangle from './pinkRectangle.jpg'

const SignIn = ({ signIn, authError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password })
  }

  return (
    <div className="signInMain">
      <div className="signIn">
        <form onSubmit={onSubmit}>
          <h5>Sign In</h5>
          <div className="signInEmail">
            <label>Email</label>
            <input style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey' }} onChange={updateEmail} />
          </div>
          <div className="signInPassword">
            <label>Password</label>
            <input type="password" style={{ boxShadow: 'none', transition: 'none', border: '1px solid darkgrey', borderRadius: '10px', padding: '0px 5px', color: 'rgb(248, 98, 131)' }} onChange={updatePassword} />
          </div>
          <div className="signInLogin">
            <button>Login</button>
            <div>
              {authError ? <p style={{ color: 'red' }}>{authError}</p> : null}
            </div>
          </div>
          <div className="signInAccountNew">
            <p>Don't have an account?</p><a href='/signUp'>Sign Up</a>
          </div>
        </form>
      </div>
      <div className="SignInImages">
        <img src={pinkRectangle} />
      </div>
      <div className="SignInImages2">
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
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
