import React from "react";
import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingByView.css";
import { useDispatch } from "react-redux";
import { setMovie } from "../redux/movieSlice";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import movieTrailer from "movie-trailer";
import { setTrailerUrl } from "../redux/trailerSlice";
import IMovie from "../types/IMovie";

function ChosenMoviesGenreView() {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState<IMovie[]>([]);
  const dispatch = useDispatch();

  const genreId = useParams<"sortBy">();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId.sortBy}`
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [genreId]);

  const handleClick = (currentMovie: IMovie) => {
    movieTrailer(currentMovie?.name || "")
      .then((url: string) => {
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
      .catch((error: Error) => console.log(error));

    dispatch(setMovie(currentMovie));
  };
  return (
    <div className="contentView">
      {movies.map((tempMovie: IMovie) => (
        <Link to={{ pathname: `/description/${tempMovie.id}` }}>
          <div className="container">
            <LazyLoadImage
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
