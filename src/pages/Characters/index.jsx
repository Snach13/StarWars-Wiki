import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ImgCharacter from "../../assets/stormtrooper.png";
import "./styles.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [countCharacters, setCountCharacters] = useState(0);
  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState([]);
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        const { count, results, next, previous } = response.data;

        setCountCharacters(count);
        setCharacters(results);

        // Update state for conditional rendering
        setNextButtonVisible(!!next);
        setPreviousButtonVisible(!!previous);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/species/?page=${page}`)
      .then((response) => {
        const speciesName = response.data.results.map((specie) => specie.name);
        setSpecies(speciesName);
      })
      .catch((error) => {
        console.error("Error fetching species:", error);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        const namePlanet = response.data.results.map((planeta) => planeta.name);
        setPlanet(namePlanet);
      })
      .catch((error) => {
        console.error("Error fetching planets:", error);
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

  return (
    <div id="main">
      <div className="count">
        <h1>TOTAL CHARACTERS: {countCharacters}</h1>
        <img src={ImgCharacter} alt="character image" />
      </div>

      <div id="content">
        {characters.map((character) => (
          <div className="card-personagem" key={character.name}>
            <h2>{character.name}</h2>
            <span>Height: {character.height / 100} m</span>
            <span>Mass: {character.mass} kg</span>
            <span>Hair Color: {character.hair_color}</span>
            <span>Skin Color: {character.skin_color}</span>
            <span>Eye Color: {character.eye_color}</span>
            <span>Birth Year: {character.birth_year}</span>
            <span>Gender: {character.gender}</span>
            <span>
              Species:{" "}
              {
                species[
                  String(character.species[0]).substr(29, 3).replace("/", "") -
                    1
                ]
              }
            </span>
            <span>
              Homeworld:{" "}
              {
                planet[
                  String(character.homeworld).substr(29, 3).replace("/", "") - 1
                ]
              }
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

export default Characters;
