import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrailerUrl } from "./redux/trailerSlice";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const { trailerUrl } = useSelector((state) => state.trailer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie, trailerUrl) => {
    if (trailerUrl) {
      dispatch(setTrailerUrl(""));
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParameters = new URLSearchParams(new URL(url).search);
          dispatch(setTrailerUrl(urlParameters.get("v")));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie, trailerUrl)}
            className={isLargeRow ? "row_posterLarge" : "row_poster"}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
