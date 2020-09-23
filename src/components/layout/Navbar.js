import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'

import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { signOut } from '../../store/actions/authActions'
import { compose } from 'redux'
import './Navbar.css'
import classNames from 'classnames'

// The REASON that Navbar is re-rendered when we go to a new pathname is because
// location changes, and location is one of Navbar's props because we connected it
// with withRouter. If a prop changes, the component is re-rendered.
// window.location.href doesn't work because it wasn't a prop of Navbar,
// so even if it changed, it would'nt make Navbar re-render!

const Navbar = ({ location, auth, profile, signOut }) => {
  const [color, setColor] = useState('')
  const [display, setDisplay] = useState('')
  const [library, setLibrary] = useState(false)
  const [truth, setTruth] = useState(false)

  useEffect(() => {
    console.log(location)
    if (location.pathname.substring(1) === 'contribute') setDisplay('none')
    else if (location.pathname.substring(1) === 'library') setLibrary(true)
    else if (location.pathname.substring(1) === 'library/playlist') setLibrary(true)
    else if (location.pathname.substring(1) === 'communities') setLibrary(true)
    else {
      setDisplay('')
      setLibrary(false)
    }

    if (location.pathname.includes("youtube")) setColor('red')
    else if (location.pathname.includes("spotify")) setColor('green')
    else if (location.pathname.includes("soundcloud")) setColor('orange')
    else setColor('')
  }, [location])

  if (!auth.isEmpty) {
    return (
      <div>
        <nav className={classNames({
          navbar: true,
          red: color === 'red',
          green: color === 'green',
          orange: color === 'orange',
          nodisplay: display === 'none',
          libraryWhite: library
        })}>
          <div className="leftSide">
            <NavLink to='/browse' style={{ color: library ? 'black' : null }}>Browse<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
            <NavLink to="/library" style={{ color: library ? 'black' : null }}>Library<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
            <NavLink to="/contribute" style={{ color: library ? 'black' : null }}>Contribute<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
            <NavLink to="/communities" style={{ color: library ? 'black' : null }}>Communities<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
          </div>
          <div className={classNames({
            hamburger: !truth,
            ex: truth
          })} onClick={() => setTruth(!truth)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="centerSide">
            <Link to="/" style={{ color: library ? 'black' : null }}>MusicLife</Link>
          </div>
          <div className="rightSide">
            <Link to="/" onClick={signOut} style={{ color: library ? 'black' : null }}>Log Out<span style={{ backgroundColor: library ? 'black' : null }}></span></Link>
            <Link id="initials" to="/">{profile.initials}</Link>
          </div>
        </nav>
        <div className={classNames({
          sideBar: truth
        })}>
          <NavLink to='/browse' onClick={() => setTruth(false)} style={{ color: library ? 'black' : null }}>Browse<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
          <NavLink to="/library" onClick={() => setTruth(false)} style={{ color: library ? 'black' : null }}>Library<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
          <NavLink to="/contribute" onClick={() => setTruth(false)} style={{ color: library ? 'black' : null }}>Contribute<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
          <NavLink to="/communities" onClick={() => setTruth(false)} style={{ color: library ? 'black' : null }}>Communities<span style={{ backgroundColor: library ? 'black' : null }}></span></NavLink>
        </div>
      </div>

    )
  } else {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }

}

// withRouter connects Navbar to an updated location. Everytime location
// updates, we catch it with useEffect and can get the new pathname and 
// the useEffect will run since we have a new location.
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);
