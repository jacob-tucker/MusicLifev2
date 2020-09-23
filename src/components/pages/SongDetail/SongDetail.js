import React, { useState, useEffect } from 'react';
import { addSong, contributeSongCommunityOnly } from '../../../store/actions/songsActions'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { appHistory } from '../../../App'
import classNames from 'classnames'

import './SongDetail.css'
import YoutubePhoto from '../youtube_provider.png'
import SpotifyPhoto from '../spotify_photo.jpg'
import SoundCloudPhoto from '../soundcloud_photo.jpg'
var platform = ''

const SongDetail = ({ location, addSong, song, yourCommunities, contributeSongCommunityOnly }) => {
  const [communityNameTyped, setCommunityNameTyped] = useState('')
  const [error, setError] = useState('')
  const [truth, setTruth] = useState(false)

  const addTheSong = () => {
    addSong({ song, id: location.state.id, hit: song.hit })
  }

  const addTheSongToCommunity = () => {
    if (yourCommunities.includes(communityNameTyped)) {
      console.log(song)
      contributeSongCommunityOnly({ song: song.name, artist: song.artist, link: song.linkTo, community: communityNameTyped })
      appHistory.push({
        pathname: '/communities/community',
        search: `community=${communityNameTyped}`,
        state: { communityName: communityNameTyped }
      })
    } else {
      setError('This community does not exist or you do not belong to this community.')
    }
  }

  useEffect(() => {
    if (song.linkTo.includes("youtube")) platform = 'youtube'
    else if (song.linkTo.includes("spotify")) platform = 'spotify'
    else if (song.linkTo.includes("soundcloud")) platform = 'soundcloud'
  }, [])

  return (
    <div className="songdetail">
      { platform === 'youtube'
        ? <a style={{ opacity: truth ? .05 : 1 }} href={song.linkTo} target="_blank"><img className="songPlatform" src={YoutubePhoto} /></a>
        : platform === 'spotify'
          ? <a style={{ opacity: truth ? .05 : 1 }} href={song.linkTo} target="_blank"><img className="songPlatform" src={SpotifyPhoto} /></a>
          : platform === 'soundcloud'
            ? <a style={{ opacity: truth ? .05 : 1 }} href={song.linkTo} target="_blank"><img className="songPlatform" src={SoundCloudPhoto} /></a>
            : null
      }
      <div style={{ opacity: truth ? .05 : 1 }} className={classNames({
        youtubeSongDescription: platform === 'youtube',
        spotifySongDescription: platform === 'spotify',
        soundcloudSongDescription: platform === 'soundcloud'
      })}>
        <h5 id="songname">{song.name}</h5>
        <h6 id="artistname">{song.artist}</h6>
        <div style={{ display: 'flex' }}>
          <Link className="specialbutton" to="/library">
            <button onClick={addTheSong}>Add
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Link>
          <div className="specialbutton">
            <button onClick={() => setTruth(true)}>Add to a Community
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames({
        songDetailAdd: true,
        dontDisplay: !truth
      })} style={{ zIndex: truth ? 5 : -1 }}>
        {truth
          ?
          <div>
            <h4>Add this song to a community you belong to</h4>
            <input id="plsHelper" onChange={(e) => {
              setError('')
              setCommunityNameTyped(e.target.value)
            }} placeholder="Enter a community" />

            <button onClick={addTheSongToCommunity}>Ok</button>
            <button id="cancelled" onClick={() => setTruth(false)}>Cancel</button>
          </div>
          :
          null
        }
        {error !== '' ? <p style={{ color: 'red' }}>{error}</p> : null}
      </div>
    </div>
  )
}

//ownProps means we're using the props from the above function
//Also, notice we're moving to a system entirely handled by firebase and redux. Before, we had to pass down the songs
//inside location, we did this in Song.js and inside state we did song: song, but we don't need that anymore, since we're
//getting all of our info from firebase now
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.location.state.id
  console.log(id)
  const allSongs = state.firestore.data.allSongs
  const song = allSongs ? allSongs[id] : null
  return {
    song: { name: song.songName, artist: song.artistName, linkTo: song.linkTo, hit: song.hit, id: id },
    yourCommunities: state.firebase.profile.communities || ['Loading...']
  }
}
//We are passing everything inside the return to the props, so in this case the addSong method, which does the stuff
//we set it equal to.
const mapDispatchToProps = (dispatch) => {
  return {
    addSong: ({ song, id, hit }) => dispatch(addSong({ song, id, hit })),
    contributeSongCommunityOnly: (song) => dispatch(contributeSongCommunityOnly(song))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "allSongs" }
  ]),
)(SongDetail);
