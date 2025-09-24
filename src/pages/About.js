
import React from "react";

 function About() {
  return (
    <div className="about">
      <h2>ⓘ About BeatBox</h2>
    
      <p>
        BeatBox is a simple music player built with React.js. 
        It lets you search, play, and save your favorite tracks 
        into your own personal library.
      </p>
<hr />
      <div className="about-section">
        <h3>✨ Features</h3>
        <ul>
          <li>🔍 Search songs by title or artist</li>
          <li>🎵 Play music instantly</li>
          <li>📚 Save to your personal library</li>
          <li>🗑 Remove songs from your library anytime</li>
        </ul>
      </div>

<hr />
      <div className="about-section">
        <h3>🚀 Coming Soon</h3>
        <p>Playlists, favorites, dark mode, and more awesome features!</p>
      </div>
<hr />
      <div className="about-section">
        <h3>💬 Contact</h3>
        <p>
         ✉️ Email: <a href="mailto:beatboxmusic@email.com">beatbox@email.com</a> <br />
         ☎ Mobile no: <a href ="9876543210"> 9876543210</a>
           
        </p>
      </div>
      <hr/>
  
    </div>
    
  );
}

export default About;
