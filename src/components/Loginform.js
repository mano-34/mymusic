import React, { useState } from "react";

function Loginform({ activeForm, setActiveForm }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === "login") {
      console.log("Logging in:", formData);
      localStorage.setItem("user", JSON.stringify({ name: "User", email: formData.email }));
    } else {
      console.log("Signing up:", formData);
      localStorage.setItem("user", JSON.stringify({ name: "User", email: formData.email }));
    }
    setActiveForm(null); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={() => setActiveForm(null)}>✖</button>
        <h2>{activeForm === "login" ? "Login" : "Signup"}</h2>
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
            {activeForm === "login" ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginform;
