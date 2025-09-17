// src/pages/Library.js
import React, { useEffect, useState } from "react";

function Library() {
  const [librarySongs, setLibrarySongs] = useState([]);

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem("library")) || [];
    setLibrarySongs(savedLibrary);
  }, []);

  return (
    <div className="library">
      <h2>📚 Your Music Library</h2>
      {librarySongs.length === 0 ? (
        <p>No songs in your library yet.</p>
      ) : (
        <div className="song-list">
          {librarySongs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={song.cover} alt={song.title} className="cover" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
