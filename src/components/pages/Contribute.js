import React, { useState } from 'react'
import { connect } from 'react-redux'
import { contributeSong } from '../../store/actions/songsActions'
import { contributeSongCommunity } from '../../store/actions/songsActions'
import { contributeSongCommunityOnly } from '../../store/actions/songsActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { appHistory } from '../../App'
import classNames from 'classnames'

import './Contribute.css'

const Contribute = ({ contributeSong, contributeSongCommunity, contributeSongCommunityOnly, communities, allSongs }) => {
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [link, setLink] = useState('')
  const [community, setCommunity] = useState('')
  const [display, setDisplay] = useState('song')
  const [error, setError] = useState('')

  const updateSong = (e) => {
    setError('')
    setSong(e.target.value)
  }

  const updateArtist = (e) => {
    setError('')
    setArtist(e.target.value)
  }

  const updateLink = (e) => {
    setError('')
    setLink(e.target.value)
  }

  const updateCommunity = (e) => {
    setError('')
    setCommunity(e.target.value)
  }

  const onSubmit = (e) => {
    if (community === '') {
      appHistory.push('/browse')
      contributeSong({ song, artist, link })
    } else if (communities.includes(community)) {
      var boolCheck = false
      allSongs.map((thing, i) => {
        if (thing.songName === song && thing.artistName === artist && thing.linkTo === link) {
          boolCheck = true
        }
      })
      if (!boolCheck) {
        contributeSongCommunity({ song, artist, link, community })
      } else {
        contributeSongCommunityOnly({ song, artist, link, community })
      }
      appHistory.push('/browse')
    } else {
      setError('You do not belong to this community!')
    }
  }

  return (
    <div className="contribute">
      <div className={classNames({
        contributeSongName: true,
        nodisplay: display !== 'song'
      })}>
        <label>Song Name</label>
        <input type="text" placeholder="..." onChange={updateSong} style={{ boxShadow: 'none', transition: 'none', border: 0, fontSize: '30px' }} />
        <button onClick={() => {
          if (song === '') setError("Please type a song name.")
          else setDisplay('artist')
        }}>OK</button>
        <button className="back" onClick={() => appHistory.push('/')}>Cancel</button>
      </div>
      <div className={classNames({
        contributeArtistName: true,
        nodisplay: display !== 'artist'
      })}>
        <label>Artist's Name</label>
        <input type="text" placeholder="..." onChange={updateArtist} style={{ boxShadow: 'none', transition: 'none', border: 0, fontSize: '30px' }} />
        <button onClick={() => {
          if (artist === '') setError("Please type an artist's name.")
          else setDisplay('link')
        }}>OK</button>
        <button className="back" onClick={() => setDisplay('song')}>Back</button>
      </div>
      <div className={classNames({
        contributeLinkName: true,
        nodisplay: display !== 'link'
      })}>
        <label>Song's Link</label>
        <p style={{ color: 'darkgrey', maxWidth: '750px' }}>Please provide a link to the song you are adding. This will
        help other users easily listen to your awesome song! This link can come from: Youtube,
        Spotify, or SoundCloud.
        </p>
        <input type="text" placeholder="..." onChange={updateLink} style={{ boxShadow: 'none', transition: 'none', border: 0, fontSize: '30px' }} />
        <button onClick={() => {
          if (link === '') setError("Please provide the song's link.")
          else setDisplay('community')
        }}>OK</button>
        <button className="back" onClick={() => setDisplay('artist')}>Back</button>
      </div>
      <div className={classNames({
        contributeCommunityName: true,
        nodisplay: display !== 'community'
      })}>
        <label>Community (optional)</label>
        <p style={{ color: 'darkgrey', maxWidth: '750px' }}>You do not have to add this song to
        a community. If you wish to skip, please leave the input field blank. Otherwise,
        provide the community's name.
        </p>
        <input type="text" placeholder="..." onChange={updateCommunity} style={{ boxShadow: 'none', transition: 'none', border: 0, fontSize: '30px' }} />
        <button onClick={onSubmit}>Submit</button>
        <button className="back" onClick={() => setDisplay('link')}>Back</button>
      </div>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    communities: state.firebase.profile.communities,
    allSongs: state.firestore.ordered.allSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contributeSong: (song) => dispatch(contributeSong(song)),
    contributeSongCommunity: (song) => dispatch(contributeSongCommunity(song)),
    contributeSongCommunityOnly: (song) => dispatch(contributeSongCommunityOnly(song))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'users' }, { collection: 'allSongs' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Contribute)
