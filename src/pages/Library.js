import React, { useEffect, useState, useRef } from "react";

function Library() {
  const [librarySongs, setLibrarySongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem("library")) || [];
    setLibrarySongs(savedLibrary);
  }, []);

  useEffect(() => {
    if (currentIndex !== null && audioRef.current) {
      audioRef.current.src = librarySongs[currentIndex].url;
      audioRef.current.play().catch((err) =>
        console.log("Play prevented by browser:", err)
      );
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const togglePlayPause = (index) => {
    if (!audioRef.current) return;

    if (isPlaying && currentIndex === index) {
      // Pause current song
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play selected song
      if (currentIndex !== index) {
        setCurrentIndex(index); // will trigger useEffect to load new song
      } else {
        audioRef.current.play().catch((err) =>
          console.log("Play prevented by browser:", err)
        );
        setIsPlaying(true);
      }
    }
  };

  const playNext = () => {
    if (librarySongs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % librarySongs.length);
  };

  const playPrev = () => {
    if (librarySongs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + librarySongs.length) % librarySongs.length);
  };

  const removeSong = (id) => {
    const updatedLibrary = librarySongs.filter((song) => song.id !== id);
    setLibrarySongs(updatedLibrary);
    localStorage.setItem("library", JSON.stringify(updatedLibrary));

    if (currentIndex !== null && librarySongs[currentIndex]?.id === id) {
      audioRef.current.pause();
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  };

  return (
    <div className="library">
      <h4>📚 Your Music Library</h4>
      {librarySongs.length === 0 ? (
        <p>No songs in your library yet.</p>
      ) : (
        <div className="song-list">
          {librarySongs.map((song, index) => (
            <div key={song.id} className="song-card">
              <img src={song.cover} alt={song.title} className="cover" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>

              <div className="actions">
                <button onClick={() => togglePlayPause(index)}>
                  {currentIndex === index && isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={() => removeSong(song.id)} className="removebtn">🛇</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentIndex !== null && (
        <div className="librarycontrols">
          <h3>Now Playing: {librarySongs[currentIndex].title}</h3>
          <p>{librarySongs[currentIndex].artist}</p>

          <button onClick={playPrev}>⏮</button>
          <button onClick={() => togglePlayPause(currentIndex)}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={playNext}>⏭</button>
        </div>
      )}

      <audio ref={audioRef} controls style={{ display: "none" }} />
      <hr />
    </div>
  );
}

export default Library;


