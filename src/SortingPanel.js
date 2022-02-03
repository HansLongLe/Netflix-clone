import axios from "./axios";
import { useEffect, useState } from "react";
import "./SortingPanel.css";

function SortingPanel() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const movieGenres_url = `/genre/movie/list?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`;
  const tvGenres_url = `/genre/tv/list?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`;

  useEffect(() => {
    async function fetchMovieGenresData() {
      const movie_request = await axios.get(movieGenres_url);
      setMovieGenres(movie_request.data);
      return movie_request;
    }
    async function fetchTvGenresData() {
      const tv_request = await axios.get(tvGenres_url);
      setTVGenres(tv_request.data);
      return tv_request;
    }
    fetchMovieGenresData();
    fetchTvGenresData();
  }, [movieGenres_url, tvGenres_url]);

  return (
    <div className="sortingPanel">
      <h3 className="movieSortingTitle">Movies</h3>
      {movieGenres === null || movieGenres.genres === undefined
        ? ""
        : movieGenres.genres.map((genre) => (
            <div key={genre.id} className="movieGenreItem">
              {genre.name}
            </div>
          ))}

      <h3 className="tvSortingTitle">TV</h3>

      {tvGenres === null || tvGenres.genres === undefined
        ? ""
        : tvGenres.genres.map((genre) => (
            <div key={genre.id} className="tvGenreItem">
              {genre.name}
            </div>
          ))}
    </div>
  );
}
export default SortingPanel;
