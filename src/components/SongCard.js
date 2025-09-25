import React from "react";

function SongCard({ song, index, currentIndex, isPlaying, playSong }) {
  const handlePlay = () => {
    playSong(index); 
  };

  return (
    <div className="song-card">
      <img src={song.cover} alt={song.title} className="cover" />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={handlePlay}>
        {currentIndex === index && isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}

export default SongCard;

