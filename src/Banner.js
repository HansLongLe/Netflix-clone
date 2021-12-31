import axios from "./axios";
import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { setMovie } from "./redux/movieSlice";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const { movie } = useSelector((state) => state.movie);
  const { trailerUrl } = useSelector((state) => state.trailer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      dispatch(
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        )
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function truncateDate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
      }}
    >
      <div className="black_cover"></div>
      <div className="banner_divider">
        <div className="banner_content">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="movieMeta_data">
            <h1 className="rating">{movie.vote_average / 2}</h1>
            <div
              className="stars"
              style={{
                "--rating": movie.vote_average / 2,
                display: "inline-block",
              }}
            ></div>
            <h1 className="release_date">
              {truncateDate(movie.first_air_date, 5)}
            </h1>
            {console.log(movie)}
          </div>
          <h1 className="banner_decription">
            {truncate(movie?.overview, 250)}
          </h1>
        </div>
        <div className="video_trailer">
          {trailerUrl && (
            <ReactPlayer
              repeat
              className="react-player"
              url={trailerUrl[1]}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    autoplay: 1,
                    loop: 1,
                    playlist: trailerUrl[0],
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Banner;
