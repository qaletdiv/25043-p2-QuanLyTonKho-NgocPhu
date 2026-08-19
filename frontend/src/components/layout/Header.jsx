import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  logout,
  getMe,
} from "../../services/authService";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await getMe();
        setUser(data.user);

      } catch (error) {
        if (error.response.status === 401) {
          alert("vui long dang nhap");
          navigate("/login");
        } else {
          console.error(
            "Something wrong in call API get info:",
            error
          );
        }
      }
    };
    getInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUserInfo = () => {
    setIsOpen(false);
    navigate("/userinfo");
  };

  return (
    <header className="header">
      <div className="header-right">
        <button type="button" className="profile-button" onClick={() => setIsOpen(!isOpen)}>
          <div className="profile-icon">
            👤
          </div>
          <span className="profile-arrow">
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="profile-dropdown">

            <button type="button" className="dropdown-item" onClick={handleUserInfo}>
              <span>
                {user?.username}
              </span>
            </button>

            <button type="button" className="dropdown-item logout-item" onClick={handleLogout}>
              <span>
                Đăng xuất
              </span>
            </button>
          </div>
        )}

      </div>

    </header>
  );
}

export default Header;