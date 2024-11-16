import { NavLink, Link } from "react-router-dom";
import "./Header.scss";
import logoMobile from "/assets/logo/InStock-Logo_2x.png";
import logoTablet from "/assets/logo/InStock-Logo_1x.png";

function Header() {
  return (
    <header className="nav">
      <nav className="nav__container">
        <Link to="/">
          <img src={logoMobile} alt="InStock logo" className="nav__logo-mobile" />
          <img src={logoTablet} alt="InStock logo" className="nav__logo-tablet" />
        </Link>
        <div className="nav-links__wrap">
          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              isActive ? "button nav__link-active" : "nav__link-inactive"
            }
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive ? "button nav__link-active" : "nav__link-inactive"
            }
          >
            Inventory
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;