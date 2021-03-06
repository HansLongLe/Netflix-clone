import axios from "../axios";
import React, { useEffect } from "react";
import requests from "../requests";
import "./css/Banner.css";
import ReactPlayer from "react-player";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { setMovie } from "../redux/movieSlice";
import { setTrailerUrl } from "../redux/trailerSlice";
import { TiThList } from "react-icons/ti";
import { IoAdd } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";
import Nav from "./Nav";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const { movie } = useSelector((state: RootStateOrAny) => state.movie);
  const { trailerUrl } = useSelector((state: RootStateOrAny) => state.trailer);
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
      dispatch(setTrailerUrl(["", ""]));
      return request;
    }
    fetchData();
  }, [dispatch]);

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  function truncateDate(str: string, n: number) {
    return str?.length > n ? str.substring(0, n - 1) : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
      }}
    >
      <Nav />
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
              style={
                {
                  // "--rating": movie.vote_average / 2,
                }
              }
            ></div>
            <h1 className="release_date">
              {truncateDate(movie.first_air_date, 5)}
            </h1>
          </div>
          <h1 className="banner_decription">
            {truncate(movie?.overview, 200)}
          </h1>
          <div className="bannerButtons">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={{
                pathname: `/description/${movie.id}`,
              }}
            >
              <div className="overviewButton">
                <TiThList />
                <h1 className="overviewText">Overview</h1>
              </div>
            </Link>
            <div className="myListButton">
              <IoAdd />
              <h1 className="myListText">My List</h1>
            </div>
            <Outlet />
          </div>
        </div>
        <div className="video_trailer">
          {trailerUrl && (
            <ReactPlayer
              repeat
              className="react-player"
              url={trailerUrl[1]}
              width="90%"
              height="90%"
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
