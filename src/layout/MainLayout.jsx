import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ padding: "1rem", flex: 1 }}>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
