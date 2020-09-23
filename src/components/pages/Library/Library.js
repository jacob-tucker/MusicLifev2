import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPlaylist, addSongToPlaylist, deleteSong } from '../../../store/actions/songsActions'

import './Library.css'
import BeautifulPhoto1 from './beautiful1.jpg'
import BeautifulPhoto2 from './beautiful2.jpeg'
import BeautifulPhoto3 from './beautiful3.jpg'
import classNames from 'classnames'

const Library = ({ profile, createPlaylist, addSongToPlaylist, deleteSong }) => {
  const [playlist, setPlaylist] = useState('')
  const [truth, setTruth] = useState(false)
  const [truth2, setTruth2] = useState(false)
  const [theSong, setTheSong] = useState('')
  const [error, setError] = useState('')

  const updatePlaylist = (e) => {
    setPlaylist(e.target.value)
    setError('')
  }

  const createThePlaylist = (e) => {
    e.preventDefault()
    setTruth2(false)
    setError('')
    createPlaylist({ playlist: playlist })
  }

  const changeTruth = (thing) => {
    console.log(truth)
    setError('')
    setTruth(!truth)
    setTheSong(thing)

  }

  const onSubmit1 = (e) => {
    e.preventDefault()
    setError('')
    if (profile.playlists.includes(playlist)) {
      addSongToPlaylist({ song: theSong, playlist: playlist })
      setTruth(false)
    } else {
      setError('You do not have this playlist! Consider creating it.')
    }
  }

  return (
    <div className="library">
      <div id="playlists" style={{ opacity: truth || truth2 ? .05 : 1 }}>
        <h1 id="playlists-title">Playlists</h1>
        <button id="playlists-creation" onClick={() => setTruth2(true)}>Create a Playlist</button>
        <span className="underline"></span>
        <div className="playlistList">
          {profile.playlists.map((thing, i) => {
            return (
              <Link key={i} className="aPlaylist" to={{
                pathname: '/library/playlist',
                state: { playlist: thing }
              }}>
                {i % 3 == 0
                  ? <img className="playlistCover" src={BeautifulPhoto1} />
                  : i % 2 == 0
                    ? <img className="playlistCover" src={BeautifulPhoto2} />
                    : i % 1 == 0
                      ? <img className="playlistCover" src={BeautifulPhoto3} />
                      : null
                }
                <div className="playlistInfo">
                  <p>{thing}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="librarySongs" style={{ opacity: truth || truth2 ? .05 : 1 }}>

        <div className="librarySongsList">
          <h1 id="songs-title">Library</h1>
          <span className="underline"></span>
          {profile.songs.map((thing, i) => {
            return (
              <div key={i} className="songInLibrary">
                <div className="songInLibraryInfo">
                  <p>{thing.name}</p>
                  <p>{thing.artist}</p>
                </div>
                { thing.linkTo.includes('youtube')
                  ? <a className="youtubeSong" href={thing.linkTo} target="_blank">YouTube</a>
                  : thing.linkTo.includes('spotify')
                    ? <a className="spotifySong" href={thing.linkTo} target="_blank">Spotify</a>
                    : thing.linkTo.includes('soundcloud')
                      ? <a className="soundcloudSong" href={thing.linkTo} target="_blank">SoundCloud</a>
                      : null
                }
                <button className="animate one" onClick={() => changeTruth(thing)}>+</button>
                <button className="animate two" onClick={() => deleteSong({ song: thing })}>-</button>

              </div>
            )
          })}
        </div>
      </div>

      <div className={classNames({
        adding: true,
        noodisplaying: !truth
      })} style={{ zIndex: truth ? 5 : -1 }}>
        {truth && profile.songs.length > 0
          ?
          <div>
            <h4>Add this song to your playlist</h4>
            <input id="plsHelp" onChange={updatePlaylist} placeholder="Enter playlist name" />
            <button onClick={onSubmit1}>Ok</button>
            <button id="canceled" onClick={() => setTruth(false)}>Cancel</button>
          </div>
          :
          null
        }
        {error !== '' ? <p>{error}</p> : null}
      </div>
      <div className={classNames({
        adding: true,
        noodisplaying: !truth2
      })} style={{ zIndex: truth2 ? 5 : -1 }}>
        {truth2
          ?
          <div>
            <h4>Create a Playlist</h4>
            <input id="plsHelp" onChange={(e) => setPlaylist(e.target.value)} placeholder="Enter playlist name" />
            <button onClick={createThePlaylist}>Create</button>
            <button id="canceled" onClick={() => setTruth2(false)}>Cancel</button>
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
    profile: state.firebase.profile || { songs: [''], playlists: [''] }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPlaylist: ({ playlist }) => dispatch(createPlaylist({ playlist })),
    addSongToPlaylist: (stuff) => dispatch(addSongToPlaylist(stuff)),
    deleteSong: (song) => dispatch(deleteSong(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
