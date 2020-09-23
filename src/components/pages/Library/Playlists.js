import React from 'react';
import { connect } from 'react-redux'

import './Playlists.css'
import './Library.css'

const Playlists = ({ location, songs }) => {
  console.log(songs)
  return (
    <div className="playlistPage">
      <div className="playlistPageInfo">
        <h1>{location.state.playlist}</h1>
      </div>

      <div className="librarySongsList2">
        <h1 id="songs-title">Songs</h1>
        <span className="underline" style={{ backgroundColor: 'black', width: '100%' }}></span>
        {songs.map((thing, i) => {
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  var holder = ownProps.location.state.playlist
  return {
    songs: state.firebase.profile[holder] || ['']
  }
}

export default connect(mapStateToProps)(Playlists);
