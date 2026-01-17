// Central axios configuration for backend API calls

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token to every request (if exists)
  API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("user"));

  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default API;
