import { Link } from "react-router-dom";
import { BiHomeAlt2, BiPlus } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__item -blue">
        <Link id="home" className="navbar__icon" to="/">
          <svg className="icon">
            <BiHomeAlt2 />
          </svg>
        </Link>
      </div>
      <div className="navbar__item -navy-blue">
        <a id="add-news" className="navbar__icon">
          <svg className="icon">
            <BiPlus />
          </svg>
        </a>
      </div>
      <div className="navbar__item -purple">
        <Link id="profile-btn" className="navbar__icon" to="/profile">
          <svg className="icon">
            <CgProfile />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
