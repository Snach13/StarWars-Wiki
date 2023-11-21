import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ImgStarship from "../../assets/nave.png";
import "./styles.css";

const Starships = () => {
  const [page, setPage] = useState(1);
  const [countStarships, setCountStarships] = useState(0);
  const [starships, setStarships] = useState([]);
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/starships/?page=${page}`)
      .then((response) => {
        const { count, results, next, previous } = response.data;

        setCountStarships(count);
        setStarships(results);

        // Update state for conditional rendering
        setNextButtonVisible(!!next);
        setPreviousButtonVisible(!!previous);
      })
      .catch((error) => {
        console.error("Error fetching starships:", error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        const namePilots = response.data.results.map((piloto) => piloto.name);
        setPilotos(namePilots);
      })
      .catch((error) => {
        console.error("Error fetching pilots:", error);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const setNextButtonVisible = (isVisible) => {
    const btnNext = document.getElementById("btnNext");
    if (btnNext) {
      btnNext.style.display = isVisible ? "block" : "none";
    }
  };

  const setPreviousButtonVisible = (isVisible) => {
    const btnPrevious = document.getElementById("btnPrevious");
    if (btnPrevious) {
      btnPrevious.style.display = isVisible ? "block" : "none";
    }
  };

  const getPilotName = (pilot) => {
    const pilotId = String(pilot).substr(28, 3).replace("/", "") - 1;
    return pilotos[pilotId];
  };

  return (
    <div id="main">
      <div className="count">
        <h1>TOTAL STARSHIPS: {countStarships}</h1>
        <img src={ImgStarship} alt="Imagem Espaço-Nave" />
      </div>

      <div id="content">
        {starships.map((starship) => (
          <div className="card-naves" key={starship.name}>
            <h2>{starship.name}</h2>
            <span>Model: {starship.model}</span>
            <span>Manufacturer: {starship.manufacturer}</span>
            <span>Cost in Credits: {starship.cost_in_credits}</span>
            <span>Length: {starship.length}</span>
            <span>
              max_atmosphering_speed: {starship.max_atmosphering_speed}
            </span>
            <span>Crew: {starship.crew}</span>
            <span>Passengers: {starship.passengers}</span>
            <span>Cargo Capacity: {starship.cargo_capacity}</span>
            <span>Consumables: {starship.consumables}</span>
            <span>Hyperdrive Rating: {starship.hyperdrive_rating}</span>
            <span>MGLT: {starship.MGLT}</span>
            <span>Starship Class: {starship.starship_class}</span>
            <span>
              <span>Pilots: {getPilotName(starship.pilots[0])}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="navigation-page">
        <button id="btnPrevious" onClick={handlePreviousPage}>
          <FaArrowCircleLeft />
          PREVIOUS PAGE
        </button>
        <button id="btnNext" onClick={handleNextPage}>
          NEXT PAGE
          <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Starships;
