import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("researcherId");

    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <NavLink to="/dashboard" className={styles.brand}>
          Grade A+
        </NavLink>
      </div>
      <div className={styles.navRight}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/createStudy"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Create Study
            </NavLink>
          </li>
          <li>
            <button
              data-testid="header-logout"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
