// This page handles user login UI
// Backend integration (JWT) will be added later

import { useState } from "react";

const Login = () => {
  // State to store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to store error messages
  const [error, setError] = useState("");

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // Temporary action (backend will replace this)
    console.log("Logging in with:", email, password);

    setError("");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
