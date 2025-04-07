import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <NavLink to="/" className={styles.brand}>
          Dare to compare
        </NavLink>
      </div>
      <div className={styles.navRight}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
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
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
