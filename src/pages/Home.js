
import React, { useState } from "react";
import SongCard from "../components/SongCard";
import Player from "../components/Player";

// images
import vaaCover from "../assets/images/vaavaa.jpg";
import monicaImg from "../assets/images/monica.jpg";
import powerHouseImg from "../assets/images/power.jpg";
import badassImg from "../assets/images/badass.jpg";
import vibeImg from "../assets/images/vibe.jpg";
import soniyaImg from "../assets/images/soniya.jpg";
import mobstaImg from "../assets/images/mobsta.jpg";
import chikituImg from "../assets/images/chikitu.jpg";
import kanimaImg from "../assets/images/kanima.jpg";
import neesingamImg from "../assets/images/singam.jpg";
import thalaivanImg from "../assets/images/thalaivan.jpg";
import madharasiImg from "../assets/images/Madharaasi.jpg";

// audio
import vaavaa from "../assets/audio/vaavaa.mp3";
import monica from "../assets/audio/monica.mp3";
import powerhouse from "../assets/audio/powerhouse.mp3";
import badass from "../assets/audio/badass.mp3";
import vibe from "../assets/audio/vibe.mp3";
import soniya from "../assets/audio/soniya.mp3";
import mobsta from "../assets/audio/mobsta.mp3";
import chikitu from "../assets/audio/chikitu.mp3";
import kanima from "../assets/audio/kanima.mp3";
import neesingam from "../assets/audio/neesingam.mp3";
import thalaivan from "../assets/audio/thalaivan.mp3";
import madharasi from "../assets/audio/madharasi.mp3";


function Home() {

  const [songs] = useState([
    { id: 1, title: "vaa vaa pakkam vaa", artist: "DJ Gowtham", url: vaavaa, cover: vaaCover },
    { id: 2, title: "Monica", artist: "Anirudh", url: monica, cover: monicaImg },
    { id: 3, title: "PowerHouse", artist: "Anirudh", url: powerhouse, cover: powerHouseImg },
    { id: 4, title: "Badass", artist: "Anirudh", url: badass, cover: badassImg },
    { id: 5, title: "Vibe", artist: "PaalDabba", url: vibe, cover: vibeImg },
    { id: 6, title: "Soniya soniya", artist: "AR.Rahman", url: soniya, cover: soniyaImg },
    { id: 7, title: "Mobsta", artist: "Anirudh", url: mobsta, cover: mobstaImg },
    { id: 8, title: "Chikitu", artist: "Anirudh", url: chikitu, cover: chikituImg },
    { id: 9, title: "Kanima", artist: "Santhosh Narayanan", url: kanima, cover: kanimaImg },
    { id: 10, title: "Nee Singam Dhan", artist: "AR.Rahman", url: neesingam, cover: neesingamImg },
    { id: 11, title: "Thalaivan", artist: "Santhosh Narayanan", url: thalaivan, cover: thalaivanImg },
    { id: 12, title: "Madharasi", artist: "AR.Rahman", url: madharasi, cover: madharasiImg },
  ]);


  const [currentIndex, setCurrentIndex] = useState(null);

  const playSong = (index) => setCurrentIndex(index);

  return (
    <div className="home">
      <h2>🎶 Trending Now</h2>
      <div className="song-list">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} playSong={() => playSong(index)} />
        ))}
      </div>
      {currentIndex !== null && (
        <Player songs={songs} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      )}
    </div>
  );
}

export default Home;
