import React, { useState, useEffect } from "react";

function Loginform({ activeForm, setActiveForm }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login");


  useEffect(() => {
    if (activeForm) {
      setMode("login");
    }
  }, [activeForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      console.log("Logging in:", formData);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "User", email: formData.email })
      );
    } else {
      console.log("Signing up:", formData);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "User", email: formData.email })
      );
    }
    setActiveForm(null); 
    window.location.reload(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={() => setActiveForm(null)}>
          ✖
        </button>

      
        <div className="tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        <h2>{mode === "login" ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">
            {mode === "login" ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginform;

