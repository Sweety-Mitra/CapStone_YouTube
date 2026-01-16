import API from "./axios";

// Create channel
export const createChannel = async (data) => {
  const res = await API.post("/channels", data);
  return res.data;
};

// Get my channel
export const fetchMyChannel = async () => {
  const res = await API.get("/channels/me");
  return res.data;
};
