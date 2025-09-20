import React, { useEffect, useState } from "react";

function Library() {
  const [librarySongs, setLibrarySongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

 useEffect(() => {
  const savedLibrary = JSON.parse(localStorage.getItem("library")) || [];
  setLibrarySongs(savedLibrary);
}, []);

  const playSong = (song) => {
    setCurrentSong(song);
    const audio = new Audio(song.url); 
    audio.play();
  };

  const removeSong = (id) => {
    const updatedLibrary = librarySongs.filter((song) => song.id !== id);
    setLibrarySongs(updatedLibrary);
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
  };

  return (
    <div className="library">
      <h4>📚 Your Music Library</h4>
      {librarySongs.length === 0 ? (
        <p>No songs in your library yet.</p>
      ) : (
        <div className="song-list">
          {librarySongs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={song.cover} alt={song.title} className="cover" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>

              <div className="actions">
                <button onClick={() => playSong(song)}>▶ </button>
              </div>
              <div className="actions">
                <button onClick={() => removeSong(song.id)}>🛇</button>
              </div>
            </div>
          ))}
        </div>
      )}
<hr/>
    </div>
  );
}

export default Library;

