import React from 'react';
import { connect } from 'react-redux'
import StockVideo from "./music_stock_video.mp4"
import HomepageBackground from "./background_home_musiclife.jpg"
import { Link } from 'react-router-dom'

import './Homepage.css'

const Homepage = ({ names }) => (
  <div>
    {names.firstName
      ?
      <div className="Homepage">
        <img src={HomepageBackground} alt="Background pic" />
        <div className="HomepageStuff">
          <h1>Welcome, {names.firstName} {names.lastName}.</h1>
        </div>
      </div>
      :
      <div className="nonlogged">
        <video className="stockvideo" autoPlay loop muted>
          <source src={StockVideo} type="video/mp4" />
        </video>
        <div className="nonloggedStuff">
          <h1>MusicLife</h1>
          <div className="signedOutLinks">
            <Link to="/signup">Signup</Link>
            <Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    }

  </div >

)

const mapStateToProps = (state) => {
  console.log(state)
  return {
    names: { firstName: state.firebase.profile.firstName, lastName: state.firebase.profile.lastName }
  }
}

export default connect(mapStateToProps)(Homepage);
