// This page handles user registration UI

import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, avatar } = form;

    // Empty check
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({ username, email, password, avatar });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <MainLayout>
      <div className="auth-container">
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="password-wrapper">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <span
              className="eye"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <input
            placeholder="Avatar URL (optional)"
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />

          {/* Avatar Preview */}
          {form.avatar && (
            <img
              src={form.avatar}
              alt="avatar preview"
              className="avatar-preview"
            />
          )}

          <button type="submit">Register</button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <span onClick={() => navigate("/login")} className="link"> Login</span>
        </p>
      </div>
    </MainLayout>
  );
};

export default Register;
