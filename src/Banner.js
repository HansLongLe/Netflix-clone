import axios from "./axios";
import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";
import Youtube from "react-youtube";
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

  const opts = {
    height: "485",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
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
          <h1 className="banner_decription">
            {truncate(movie?.overview, 250)}
          </h1>
        </div>
        <div className="video_trailer">
          {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
      </div>
    </header>
  );
}

export default Banner;
