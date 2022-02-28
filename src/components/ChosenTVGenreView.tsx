import React from "react";
import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingByView.css";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setTrailerUrl } from "../redux/trailerSlice";
import movieTrailer from "movie-trailer";
import ITv from "../types/ITv";
import { setMovie } from "../redux/movieSlice";

function ChosenTVGenreView() {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [tvs, setTvs] = useState<ITv[]>([]);
  const dispatch = useDispatch();

  const genreId = useParams<"sortBy">();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId.sortBy}`
      );
      setTvs(request.data.results);
      return request;
    }
    fetchData();
  }, [genreId]);

  const handleClick = (currentTv: ITv) => {
    movieTrailer(currentTv?.name || "")
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

    dispatch(setMovie(currentTv));
  };
  return (
    <div className="contentView">
      {tvs.map((tempTvs: ITv) => (
        <Link to={{ pathname: `/description/${tempTvs.id}` }}>
          <div className="container">
            <img
              key={tempTvs.id}
              onClick={() => handleClick(tempTvs)}
              className={"posterImage"}
              src={`${base_url}${tempTvs.poster_path}`}
              alt={tempTvs.name}
            />
            <h3 className="contentName">
              {tempTvs?.title || tempTvs?.name || tempTvs?.original_name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChosenTVGenreView;
