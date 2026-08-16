import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    // Tạm thời chỉ kiểm tra giao diện.
    // Sau này sẽ thay bằng API Node.js.
    console.log({
      username,
      password,
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div className="brand-icon">
            📦
          </div>

          <h1>Quản Lý Mua Hàng</h1>
          <p>Hệ thống quản lý mua hàng và tồn kho</p>
        </div>

        <div className="login-card">
          <h2>Đăng nhập</h2>
          <p className="login-description">
            Đăng nhập để tiếp tục sử dụng hệ thống
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                Tên đăng nhập / Email
              </label>

              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập hoặc email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Mật khẩu
              </label>

              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
        </div>

        <p className="login-footer">
          © 2026 Purchase & Inventory Management System
        </p>
      </div>
    </div>
  );
}

export default Login;