import "./SearchHeader.scss";
import { Link } from "react-router-dom";

function SearchHeader({ title, buttonLink, buttonTitle, handleSearchInput }) {
  return (
    <div className="search-header">
      <h1 className="search-header__title">{title}</h1>
      <form className="search-header__form" action="">
        <input
          className="search-header__input"
          type="search"
          placeholder="Search..."
          onChange={handleSearchInput}
        ></input>
        <Link className="search-header__button" to={buttonLink}>
          {buttonTitle}
        </Link>
      </form>
    </div>
  );
}

export default SearchHeader;
