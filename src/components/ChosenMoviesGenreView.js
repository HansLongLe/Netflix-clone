import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingByView.css";
import { useDispatch } from "react-redux";
import { setMovie } from "../redux/movieSlice";
import { Link } from "react-router-dom";

function ChosenMoviesGenreView({ genreId }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/discover/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&with_genres=${genreId.sortBy}`
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [genreId]);

  function handleClick(tempMovie) {
    dispatch(setMovie(tempMovie));
  }
  return (
    <div className="contentView">
      {movies.map((tempMovie) => (
        <Link to={{ pathname: `/description/${tempMovie.id}` }}>
          <div className="container">
            <img
              key={tempMovie.id}
              onClick={() => handleClick(tempMovie)}
              className={"posterImage"}
              src={`${base_url}${tempMovie.poster_path}`}
              alt={tempMovie.name}
            />
            <h3 className="contentName">
              {tempMovie?.title || tempMovie?.name || tempMovie?.original_name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChosenMoviesGenreView;
