import React, { useState } from "react";

function SongCard({ song, playSong, }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    playSong(song); 
    setIsPlaying(!isPlaying); 
  };

  return (
    <div className="song-card">
      <img src={song.cover} alt={song.title} className="cover" />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={handlePlay}>
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}

export default SongCard;

