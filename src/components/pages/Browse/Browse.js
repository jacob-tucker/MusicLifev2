import React, { useState } from 'react';
import Song from '../Song'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './Browse.css';
import LatestTrackPhoto from './latest_track.jpg'
import HottestTrackPhoto from './hottest_track.jpg'
import PoppingCommunitiesPhoto from './popping_communities.jpg'

const Browse = ({ songs, auth, communities }) => {
  const [search, setSearch] = useState('')

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  var bighit = 0
  var hotsong = { songName: '', artistName: '' }
  var peoples = 0
  var theCommunity = ''
  return (
    <div>
      <div className="transition">
        <div className="intro-text">
          <h2>
            <span>Find songs you love.</span>
          </h2>
          <h2>
            <span>Discover communities.</span>
          </h2>
          <h2>
            <span>Create your own music life.</span>
          </h2>
        </div>
      </div>
      <div className="slider">

      </div>
      <div className="browsetab">
        <h1 style={{ color: 'pink' }}>Browse</h1>
        <div className="latesttrack">
          <img src={LatestTrackPhoto} />
          <h5>Latest Track</h5>
          <h3>{songs[songs.length - 1].songName}</h3>
        </div>
        <div className="hottesttrack">
          <img src={HottestTrackPhoto} />
          <h5>Hottest Track</h5>
          <h3>{songs.map((thing, i) => {
            if (songs[i].hit > bighit) {
              hotsong = { songName: songs[i].songName, artistName: songs[i].artistName }
              bighit = songs[i].hit
            }
          })}{hotsong.songName}</h3>
        </div>
        <div className="popcommunity">
          <img src={PoppingCommunitiesPhoto} />
          <h5>Popping Communities</h5>
          <h3>{communities.map((thing, i) => {
            if (communities[i].people > peoples) {
              theCommunity = thing.id
              peoples = communities[i].people
            }
          })}{theCommunity}</h3>
        </div>
      </div>
      <div className="browse">
        <input id="searcher" type="text" placeholder="Search..." onChange={updateSearch} />
        <div className="youtube">

          <div className="youtubeBeginners">
            <h1 className="youtubeTitle">YouTube</h1>
            <span className="youtubeSlash"></span>
          </div>

          <div className="youtubeSongs">
            {songs.map((thing, i) => {
              if ((search === '' && thing.linkTo.includes("youtube")) || (search !== '' && thing.linkTo.includes("youtube") && (thing.songName.toLowerCase().includes(search.toLowerCase()) || thing.artistName.toLowerCase().includes(search.toLowerCase())))) {
                return (
                  <div className="songLister" key={i}><Song song={thing} /></div>
                )
              }
            })}
          </div>
        </div>
        <div className="spotify">

          <div className="spotifyBeginners">
            <h1 className="spotifyTitle">Spotify</h1>
            <span className="spotifySlash"></span>
          </div>

          <div className="spotifySongs">
            {songs.map((thing, i) => {
              if ((search === '' && thing.linkTo.includes("spotify")) || (search !== '' && thing.linkTo.includes("spotify") && (thing.songName.toLowerCase().includes(search.toLowerCase()) || thing.artistName.toLowerCase().includes(search.toLowerCase())))) {
                return (
                  <div className="songLister" key={i}><Song song={thing} /></div>
                )
              }
            })}
          </div>
        </div>
        <div className="soundcloud">

          <div className="soundcloudBeginners">
            <h1 className="soundcloudTitle">SoundCloud</h1>
            <span className="soundcloudSlash"></span>
          </div>

          <div className="soundcloudSongs">
            {songs.map((thing, i) => {
              if ((search === '' && thing.linkTo.includes("soundcloud")) || (search !== '' && thing.linkTo.includes("soundcloud") && (thing.songName.toLowerCase().includes(search.toLowerCase()) || thing.artistName.toLowerCase().includes(search.toLowerCase())))) {
                return (
                  <div className="songLister" key={i}><Song song={thing} /></div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>

  )
}

//This takes the songs from the store (look at rootReducer) and puts it into the props of Browse
//The || with the empty object is put there becuase initially, firebase won't have time to retrieve the data
//but we need to have it map over something, so we can pass in an empty thing so it can at least read it
const mapStateToProps = (state) => {
  console.log(state)
  return {
    songs: state.firestore.ordered.allSongs || [{ artistName: '', songName: '', linkTo: '' }],
    auth: state.firebase.auth,
    communities: state.firestore.ordered.communities || ['']
  }
}

//firestoreConnect makes the firestone listen to the specific allSongs collection
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'allSongs' }, { collection: 'communities' }
  ])
)(Browse);
