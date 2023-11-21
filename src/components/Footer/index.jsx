import { FaCodepen, FaLinkedin, FaGithub, FaJediOrder } from "react-icons/fa";
import "./styles.css";

function Footer() {
  return (
    <footer>
      <div className="fonte-api">
        <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer">
          <FaJediOrder />
          <p>Star Wars API </p>
        </a>
      </div>

      <div className="criador">
        <span>Developed by Nachiket Gomkale</span>
        <span>
          <strong>Full Stack Developer</strong>
        </span>
      </div>

      <div className="redes-sociais">
        <a
          href="https://www.linkedin.com/in/nachiket-gomkale-a95940147/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Snach13"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
