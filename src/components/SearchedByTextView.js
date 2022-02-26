import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingByView.css";
import { useDispatch } from "react-redux";
import { setMovie } from "../redux/movieSlice";
import { Link } from "react-router-dom";
import movieTrailer from "movie-trailer";
import { setTrailerUrl } from "../redux/trailerSlice";

function SearchByTextView({ searchedText }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const movieRequest = await axios.get(
        `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchedText.sortBy}`
      );
      setMovies(movieRequest.data.results);
      const tvRequest = await axios.get(
        `/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchedText.sortBy}`
      );
      setTvs(tvRequest.data.results);
      return movieRequest;
    }
    fetchData();
  }, [searchedText]);

  const handleClick = (currentMovie) => {
    movieTrailer(currentMovie?.name || "")
      .then((url) => {
        if (url === null) {
          dispatch(setTrailerUrl(""));
        } else {
          const urlParameters = new URLSearchParams(new URL(url).search);
          dispatch(
            setTrailerUrl([
              urlParameters.get("v"),
              `https://www.youtube.com/embed/${urlParameters.get("v")}`,
            ])
          );
        }
      })
      .catch((error) => console.log(error));

    dispatch(setMovie(currentMovie));
  };
  return (
    <div className="contentView">
      {movies.map((tempMovie) => (
        <Link to={{ pathname: `/description/${tempMovie.id}` }}>
          {tempMovie.poster_path !== null ? (
            <div className="container">
              <img
                key={tempMovie.id}
                onClick={() => handleClick(tempMovie)}
                className={"posterImage"}
                src={`${base_url}${tempMovie.poster_path}`}
                alt={tempMovie.name}
              />
              <h3 className="contentName">
                {tempMovie?.title ||
                  tempMovie?.name ||
                  tempMovie?.original_name}
              </h3>
            </div>
          ) : (
            ""
          )}
        </Link>
      ))}
      {tvs.map((tempTv) => (
        <Link to={{ pathname: `/description/${tempTv.id}` }}>
          {tempTv.poster_path !== null ? (
            <div className="container">
              <img
                key={tempTv.id}
                onClick={() => handleClick(tempTv)}
                className={"posterImage"}
                src={`${base_url}${tempTv.poster_path}`}
                alt={tempTv.name}
              />
              <h3 className="contentName">
                {tempTv?.title || tempTv?.name || tempTv?.original_name}
              </h3>
            </div>
          ) : (
            ""
          )}
        </Link>
      ))}
    </div>
  );
}

export default SearchByTextView;
