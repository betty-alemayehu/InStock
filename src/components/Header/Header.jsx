import { NavLink, Link } from "react-router-dom";
import "./Header.scss";
import logo from "/assets/logo/InStock-Logo_2x.png";

function Header() {
  return (
    <nav className="nav">
      <header className="nav__container">
        <Link to="/">
          <img src={logo} alt="InStock logo" className="nav__logo" />
        </Link>
        <div className="nav-links__wrap">
          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              isActive ? "nav__link-active" : "nav__link-inactive"
            }
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive ? "nav__link-active" : "nav__link-inactive"
            }
          >
            Inventory
          </NavLink>
        </div>
      </header>
    </nav>
  );
}

export default Header;
