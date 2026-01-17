import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VideoPlayer from "../pages/VideoPlayer";
import Channel from "../pages/Channel";
import VideoPlayerDetails from "../components/video/VideoPlayerDetails";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/video/:id"
        element={<VideoPlayerDetails key={window.location.pathname} />}
      />
      <Route path="/channel" element={<Channel />} />

    {/* INVALID ROUTES */}
      <Route path="*" element={<NotFound />} /> 
    </Routes>

  );
};

export default AppRoutes;
