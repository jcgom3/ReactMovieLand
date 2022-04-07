import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=c1be11fa";

// const movie = {
//   Title: "Avengers: Infinity War",
//   Year: "2018",
//   imdbID: "tt4154756",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
// }

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect((movie) => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          placeholder="Search for Movies"
          //e.target.value on the setSearchTerm to be able to type in the input search bar
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* /* dynamically render the the array of movies + images from the new search */}
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/* to map movieCard + terniary conditional*/}
      {movies?.length > 0 ? (
        <div className="container">
          {/* dynamically mapping through the movie from useState, pass a movie prop on the movieCard component of movie  */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
