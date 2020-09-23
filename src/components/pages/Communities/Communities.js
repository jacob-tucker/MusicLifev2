import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCommunity } from '../../../store/actions/communityActions'
import { joinCommunity } from '../../../store/actions/communityActions'
import { removeCommunity } from '../../../store/actions/communityActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './Communities.css'
import classNames from 'classnames'

import CommunityPhoto1 from './communities1.jpg'
import CommunityPhoto2 from './communities2.jpeg'
import CommunityPhoto3 from './communities4.jpg'

const Communities = ({ addCommunity, communities, joinCommunity, yourCommunities, removeCommunity }) => {
  const [community, setCommunity] = useState('')
  const [interests, setInterests] = useState('')
  const [communityName, setCommunityName] = useState('')
  const [communityNameR, setCommunityNameR] = useState('')
  const [error, setError] = useState('')
  const [truth, setTruth] = useState(false)
  const [firstQ, setFirstQ] = useState(true)

  const updateCommunity = (e) => {
    setError('')
    setCommunity(e.target.value)
  }

  const updateInterests = (e) => {
    setError('')
    setInterests(e.target.value)
  }

  const checkCommunityAvailable = (e) => {
    e.preventDefault()
    if (community === '') setError("Please type a community name.")
    else {
      var boolchecker = false
      communities.map((thing) => {
        if (thing.id === community) {
          boolchecker = true
        }
      })
      if (boolchecker) setError('This community already exists! Consider joining it.')
      else {
        setFirstQ(false)
      }
    }
  }

  const addTheCommunity = () => {
    addCommunity({ community, interests })
    setCommunity('')
    setInterests('')
  }

  const updateCommunityName = (e) => {
    setError('')
    setCommunityName(e.target.value)
  }

  const updateCommunityNameR = (e) => {
    setError('')
    setCommunityNameR(e.target.value)
  }

  const joinTheCommunity = (communityName) => {
    joinCommunity({ communityName })
  }

  const onSubmit3 = (e) => {
    e.preventDefault()
    var boool = false
    yourCommunities.map((thing, i) => {
      if (thing === communityNameR) {
        boool = true
      }
    })
    if (boool) {
      removeCommunity({ communityNameR })
      setCommunityNameR('')
    } else {
      setError('You are not currently in that community, so dont worry!')
    }
  }

  return (
    <div>
      <div className="communitiesList" style={{ opacity: truth ? .05 : 1 }}>
        <h1 className="communities-title">Communities</h1>
        <button id="community-creation" onClick={() => {
          setTruth(true)
          setFirstQ(true)
        }}>Create a Community</button>
        <span className="underliner"></span>
        <div className="theCommunities">
          {yourCommunities.map((thing, i) => {
            return (
              <Link className="aCommunity" to={{
                pathname: "/communities/community",
                search: `community=${thing}`,
                state: { communityName: thing }
              }} key={i}>{thing}
                {i % 3 == 0
                  ? <img className="communityCover" src={CommunityPhoto1} />
                  : i % 2 == 0
                    ? <img className="communityCover" src={CommunityPhoto2} />
                    : i % 1 == 0
                      ? <img className="communityCover" src={CommunityPhoto3} />
                      : null
                }
                <div className="communityInfo">
                  <p>{thing}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="suggestedCommunitiesList" style={{ opacity: truth ? .05 : 1 }}>
        <h1 className="suggested-communities-title">Suggested Communities</h1>
        <span className="underliner"></span>

        <div className="suggestedCommunitiesLister">
          {communities.map((thing, i) => {
            if (i < 5 && !yourCommunities.includes(thing.id)) {
              return (
                <div className="suggestedCommunity" key={i}>
                  {i % 3 == 0
                    ? <img className="suggestedCommunityCover" src={CommunityPhoto2} />
                    : i % 2 == 0
                      ? <img className="suggestedCommunityCover" src={CommunityPhoto1} />
                      : i % 1 == 0
                        ? <img className="suggestedCommunityCover" src={CommunityPhoto3} />
                        : null
                  }
                  <button className="joinButton" onClick={() => joinTheCommunity(thing.id)}>Join</button>
                  <div className="suggestedCommunityInfo">
                    <p className="suggestedCommunityName">{thing.id}</p>
                    <p className="suggestedCommunityInterests">{thing.interests}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>

      <div className={classNames({
        adding: true,
        noodisplaying: !truth
      })} style={{ zIndex: truth ? 5 : -1 }}>
        {truth
          ?
          <div>
            <div className={classNames({
              buttonbaryuh: true,
              hideMe: !firstQ
            })}>
              <h4>Name of Your Community</h4>
              <input id="plsHelp" placeholder="Enter a community name..." onChange={updateCommunity} />
              <button onClick={checkCommunityAvailable}>Next</button>
              <button id="canceled" onClick={() => {
                setTruth(false)
                setFirstQ(false)
              }}>Cancel</button>
              {error !== '' ? <p style={{ color: 'red' }}>{error}</p> : null}
            </div>
            <div className={classNames({
              buttonbaryuh: true,
              hideMe: firstQ
            })}>
              <h4>Describe Your Community</h4>
              <p style={{ color: 'darkgrey', width: '400px' }}>This is the perfect opportunity to tell other people about what your community loves,
              so you can attract others who share your interests!
              </p>
              <input id="plsHelp" placeholder="Description..." onChange={updateInterests} />
              <button onClick={() => {
                addTheCommunity()
                setTruth(false)
              }}>Finish</button>
              <button id="canceled" onClick={() => setFirstQ(true)}>Back</button>
            </div>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    communities: state.firestore.ordered.communities || [{ id: "fake!", posts: [], songs: [] }],
    yourCommunities: state.firebase.profile.communities || ['Loading...']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommunity: (community) => dispatch(addCommunity(community)),
    joinCommunity: (community) => dispatch(joinCommunity(community)),
    removeCommunity: (community) => dispatch(removeCommunity(community))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'communities' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Communities);
