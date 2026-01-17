// Central axios configuration for backend API calls

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token to every request (if exists)
  API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;
