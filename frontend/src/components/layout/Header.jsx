function Header() {
  return (
    <header className="header">

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Admin</span>
        </div>

        <button className="logout-button">
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default Header;