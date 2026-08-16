import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Header />
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
// outlet nơi React Router đưa page hiện tại vào.
export default MainLayout;