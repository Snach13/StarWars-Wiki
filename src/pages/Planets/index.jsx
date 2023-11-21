import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ImgPlanet from "../../assets/planeta.png";
import "./styles.css";

const Planets = () => {
  const [page, setPage] = useState(1);
  const [countPlanets, setCountPlanets] = useState(0);
  const [planets, setPlanets] = useState([]);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        const { count, results, next, previous } = response.data;

        setCountPlanets(count);
        setPlanets(results);

        // Update state for conditional rendering
        setNextButtonVisible(!!next);
        setPreviousButtonVisible(!!previous);
      })
      .catch((error) => {
        console.error("Error fetching planets:", error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        const nomePessoa = response.data.results.map((pessoa) => pessoa.name);
        setResidents(nomePessoa);
      })
      .catch((error) => {
        console.error("Error fetching residents:", error);
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

  const getResidentName = (resident) => {
    const residentId = String(resident).substr(28, 3).replace("/", "") - 1;
    return residents[residentId];
  };

  return (
    <div id="main">
      <div className="count">
        <h1>TOTAL PLANETS: {countPlanets}</h1>
        <img src={ImgPlanet} alt="planet image" />
      </div>

      <div id="content">
        {planets.map((planet) => (
          <div className="card-planetas" key={planet.name}>
            <h2>{planet.name}</h2>
            <span>Rotation Period: {planet.rotation_period}</span>
            <span>Orbital Period: {planet.orbital_period}</span>
            <span>Diameter: {planet.diameter}</span>
            <span>Climate: {planet.climate}</span>
            <span>Gravity: {planet.gravity}</span>
            <span>Terrain: {planet.terrain}</span>
            <span>Surface Water: {planet.surface_water}</span>
            <span>Population: {planet.population}</span>
            <span>Residents: {getResidentName(planet.residents[0])}</span>
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

export default Planets;
