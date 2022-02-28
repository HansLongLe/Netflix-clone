import React from "react";
import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingPanel.css";
import { Link } from "react-router-dom";
import IGenre from "../types/IGenre";

function SortingPanel() {
  const [movieGenres, setMovieGenres] = useState<IGenre[]>([]);
  const [tvGenres, setTVGenres] = useState<IGenre[]>([]);
  const movieGenres_url = `/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const tvGenres_url = `/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  useEffect(() => {
    async function fetchMovieGenresData() {
      const movie_request = await axios.get(movieGenres_url);
      setMovieGenres(movie_request.data.genres);
      return movie_request;
    }
    async function fetchTvGenresData() {
      const tv_request = await axios.get(tvGenres_url);
      setTVGenres(tv_request.data.genres);
      return tv_request;
    }
    fetchMovieGenresData();
    fetchTvGenresData();
  }, [movieGenres_url, tvGenres_url]);

  return (
    <div className="sortingPanel">
      <h3 className="movieSortingTitle">Movies</h3>
      {movieGenres === null || movieGenres === undefined
        ? ""
        : movieGenres.map((genre: IGenre) => (
            <Link
              to={{ pathname: `/browse/movies/${genre.id}` }}
              style={{ textDecoration: "none" }}
            >
              <div key={genre.id} className="movieGenreItem">
                {genre.name}
              </div>
            </Link>
          ))}

      <h3 className="tvSortingTitle">TV Series</h3>

      {tvGenres === null || tvGenres === undefined
        ? ""
        : tvGenres.map((genre: IGenre) => (
            <Link
              to={{ pathname: `/browse/tv/${genre.id}` }}
              style={{ textDecoration: "none" }}
            >
              <div key={genre.id} className="tvGenreItem">
                {genre.name}
              </div>
            </Link>
          ))}
    </div>
  );
}
export default SortingPanel;
