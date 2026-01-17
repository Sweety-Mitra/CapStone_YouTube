// This page handles user login UI

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import MainLayout from "../layout/MainLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      //Correct storage format
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: res.data.token,
          user: res.data.user,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <MainLayout>

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

    </MainLayout>
  );
};

export default Login;
