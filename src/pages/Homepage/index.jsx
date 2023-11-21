import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../../assets/logoYellow.png";
import planet from "../../assets/planeta.png";
import character from "../../assets/stormtrooper.png";
import nave from "../../assets/nave.png";
import { Link } from "react-router-dom";
import { FaJediOrder, FaEye } from "react-icons/fa";
import { Timeline } from "rsuite";
import { format } from "date-fns";
import "./styles.css";
import Footer from "../../components/Footer";

const Homepage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/films/");

        setFilms(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div id="home-page">
      <div className="content">
        <img src={logo} alt="yellow star war logo" />
        <section>
          <h1>Star Wars Wiki</h1>
          <p>
            Star Wars Wiki, the most complete wikipedia about the Star Wars
            universe.
          </p>
          <p>
            Here you find everything you need to know about the Star Wars
            universe.
          </p>
        </section>

        <div className="spotlight">
          <div className="card-spotlight">
            <img src={character} alt="character icon" />
            <div>
              <h1>Characters</h1>
              <p>
                Here you can find information about all the characters in the
                Star Wars franchise.
              </p>
              <Link to="/characters">
                View more <FaEye />
              </Link>
            </div>
          </div>

          <div className="card-spotlight">
            <img src={planet} alt="planet icon" />
            <div>
              <h1>Planets</h1>
              <p>
                Here you can find information about all the planets in the Star
                Wars franchise.
              </p>
              <Link to="/planets">
                View more <FaEye />
              </Link>
            </div>
          </div>

          <div className="card-spotlight">
            <img src={nave} alt="nave icon"></img>
            <div>
              <h1>Startships</h1>
              <p>
                Here you can find information about all the starships in the
                Star Wars franchise.
              </p>
              <Link to="/starships">
                View more <FaEye />
              </Link>
            </div>
          </div>
        </div>

        <section className="section-timeline">
          <h2>Classic Star Wars Movies</h2>
          <Timeline className="timeline">
            {films.map((film) => (
              <Timeline.Item dot={<FaJediOrder />} key={film.title}>
                <h3>{film.title}</h3>
                <strong>Episode {film.episode_id}</strong>
                <p>{format(new Date(film.release_date), "dd-MM-yyyy")}</p>
                <p>{film.opening_crawl}</p>
              </Timeline.Item>
            ))}
          </Timeline>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
