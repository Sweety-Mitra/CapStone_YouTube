import API from "./axios";

// Register new user
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// Login existing user
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
