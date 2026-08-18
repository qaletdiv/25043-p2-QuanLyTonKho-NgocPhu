import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function Header() {
  const navigate = useNavigate();
  const logoutbtnActive = async ()=>{
      try {
        await logout();
        navigate("/login")
      } catch (error) {
        console.error("logout error:", error);
      }
  }

  return (
    <header className="header">

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Admin</span>
        </div>

        <button type="button" className="logout-button" onClick={logoutbtnActive}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default Header;