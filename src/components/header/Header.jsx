const Header = () => {
  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <strong>YouTube</strong>
      <input style={{ marginLeft: "1rem" }} placeholder="Search" />
      <button style={{ marginLeft: "1rem" }}>Sign In</button>
    </header>
  );
};

export default Header;
