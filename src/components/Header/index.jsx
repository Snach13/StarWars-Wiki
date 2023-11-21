import { Link } from "react-router-dom";
import logo from "../../assets/logoHorizontal.svg";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <nav className="nav-main">
        <Link to="/">
          <img src={logo} alt="logo star wars" />
        </Link>

        <ul>
          <li>
            <Link to="/" className="home">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/characters" className="personagens">
              CHARACTERS
            </Link>
          </li>

          <li>
            <Link to="/planets" className="planetas">
              PLANETS
            </Link>
          </li>

          <li>
            <Link to="/starships" className="espaco-naves">
              STARSHIPS
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
