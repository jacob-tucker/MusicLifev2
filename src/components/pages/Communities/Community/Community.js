import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deletePost, postMessage } from '../../../../store/actions/communityActions'

import './Community.css'
import classNames from 'classnames'

const Community = ({ location, community, name, id, deletePost, postMessage }) => {
  const [truth, setTruth] = useState(false)
  const [message, setMessage] = useState('')

  const deleteIt = (thing) => {
    deletePost({ post: thing.post, communityName: location.state.communityName, id, author: thing.author })
  }

  const onSubmit = (e) => {
    setTruth(false)
    postMessage({ post: message, community: community.id, posts: community.posts, theName: name, id: id })
  }

  return (
    <div className="communityPage">
      <div className="communityPagePosts" style={{ opacity: truth ? .05 : 1 }}>
        <h3 className="communityPage-title">Messages</h3>
        <button className="communityPagePosts-post" onClick={() => setTruth(true)}>Post a Note</button>
        <span className="underlining"></span>

        <div className="communityPagePostsList">
          {community.posts.map((thing, i) => {
            if (thing.id === id) {
              return (
                <div key={i} className={classNames({
                  post: (i % 2) === 0,
                  post2: (i % 2) === 1
                })}>
                  <p>You</p>
                  <p>{thing.post}</p>

                  <div onClick={() => deleteIt(thing)} className={classNames({
                    arrowleft: (i % 2) === 0,
                    arrowleft2: (i % 2) === 1
                  })}>
                    <button id="button-shit">x</button>
                  </div>

                </div>
              )
            } else {
              return (
                <div key={i} className={classNames({
                  post: (i % 2) === 0,
                  post2: (i % 2) === 1
                })}>
                  <p>{thing.author}</p>
                  <p>{thing.post}</p>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className="communityPageSongs" style={{ opacity: truth ? .05 : 1 }}>
        <h3 className="communityPage-title">Songs</h3>
        <span className="underlining"></span>

        <div className="communityPageSongsList">
          {community.songs.map((thing, i) => {
            return (
              <div key={i} className="aSong">
                <div className="package">
                  <h5>{thing.songName}</h5>
                  <p>{thing.artistName}</p>
                </div>
                { thing.linkTo.includes('youtube')
                  ? <a className="youtubeSongCommunity" href={thing.linkTo} target="_blank">YouTube</a>
                  : thing.linkTo.includes('spotify')
                    ? <a className="spotifySongCommunity" href={thing.linkTo} target="_blank">Spotify</a>
                    : thing.linkTo.includes('soundcloud')
                      ? <a className="soundcloudSongCommunity" href={thing.linkTo} target="_blank">SoundCloud</a>
                      : null
                }
              </div>
            )
          })}
        </div>
      </div>

      <div className={classNames({
        postingA: true,
        noDisplay: !truth
      })} style={{ zIndex: truth ? 5 : -1 }}>
        {truth
          ?
          <div>
            <h4>Post a Message</h4>
            <textarea id="plsHelp4" onChange={(e) => setMessage(e.target.value)} placeholder="Type your post..."></textarea>
            <button onClick={onSubmit}>Post</button>
            <button id="canceled" onClick={() => setTruth(false)}>Cancel</button>
          </div>
          :
          null
        }
      </div>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  var holder = ''
  state.firestore.ordered.communities.map((thing, i) => {
    if (thing.id === ownProps.location.state.communityName) {
      holder = thing
    }
  })
  return {
    community: holder || { id: "fake!", songs: [], posts: [] },
    name: { firstName: state.firebase.profile.firstName, lastName: state.firebase.profile.lastName },
    id: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: ({ post, communityName, id, author }) => dispatch(deletePost({ post, communityName, id, author })),
    postMessage: ({ post, community, posts, theName, id }) => dispatch(postMessage({ post, community, posts, theName, id }))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'communities' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Community)
