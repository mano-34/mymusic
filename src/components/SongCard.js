
import React from "react";

function SongCard({ song, playSong }) {
  return (
    <div className="song-card">
      <img src={song.cover} alt={song.title} className="cover" />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={playSong}>▶ Play</button>
    </div>
  );
}

export default SongCard;
