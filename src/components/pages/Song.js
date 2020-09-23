import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import YoutubePhoto from './youtube_provider.png'
import SpotifyPhoto from './spotify_photo.jpg'
import SoundCloudPhoto from './soundcloud_photo.jpg'
import './Song.css'


const Song = ({ song }) => {
  const [platform, setPlatform] = useState('')

  useEffect(() => {
    if (song.linkTo.includes("youtube")) setPlatform('youtube')
    else if (song.linkTo.includes("spotify")) setPlatform('spotify')
    else if (song.linkTo.includes("soundcloud")) setPlatform('soundcloud')
    console.log(platform)
  }, [])

  return (
    <div className="songClick">
      <NavLink id="thesongs" to={{
        pathname: `/browse/songdetail/song/${platform}`,
        search: `name=${song.songName}`,
        state: { id: song.id }
      }}>
        {song.linkTo.includes('youtube')
          ? <img className="musicProvider" src={YoutubePhoto} />
          : song.linkTo.includes('spotify')
            ? <img className="musicProvider" src={SpotifyPhoto} />
            : song.linkTo.includes('soundcloud')
              ? <img className="musicProvider" src={SoundCloudPhoto} />
              : null
        }
        <div className="songNameAndArtist">
          <h5>{song.songName}</h5>
          <p>{song.artistName}</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Song;
