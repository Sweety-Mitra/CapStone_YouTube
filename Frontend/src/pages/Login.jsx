// This page handles user login UI
// Backend integration (JWT) will be added later

import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  // State to store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // State to store error messages
  const [error, setError] = useState("");

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Store JWT token
      localStorage.setItem("token", res.data.token);

      // Store user info (optional but useful)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
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

      <p>
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")} className="link">
          Register
        </span>
      </p>

    </div>
  );
};

export default Login;
