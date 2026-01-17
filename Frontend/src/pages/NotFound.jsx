import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you’re looking for doesn’t exist.</p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Go to Home
        </button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
