import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUpload,
  FaCamera,
  FaHistory,
  FaChartBar,
  FaCog,
  FaCar,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Upload", path: "/upload", icon: <FaUpload /> },
    { name: "Live Camera", path: "/camera", icon: <FaCamera /> },
    { name: "History", path: "/history", icon: <FaHistory /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="sidebar">

      <div className="logo">

        <FaCar className="logo-icon"/>

        <h2>ANPR</h2>

      </div>

      <div className="menu">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;