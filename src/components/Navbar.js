import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";

function Navbar({ searchTerm, setSearchTerm, setActiveForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <Music2 size={28} />
          <span>BeatBox</span>
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔍︎</button>
      </div>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>

      <ul className={isOpen ? "show" : ""}>
        <li><Link to="/" onClick={handleLinkClick}>🏠︎ Home</Link></li>
        <li><Link to="/library" onClick={handleLinkClick}>📖 Library</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>ⓘ About</Link></li>

        {!user ? (
          <li>
            <button
              className="auth-btn"
              onClick={() => setActiveForm("auth")}
            >
              Login/Signup
            </button>
          </li>
        ) : (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleLogout}>🚪 Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;



