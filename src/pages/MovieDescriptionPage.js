import React from "react";
import "./css/MovieDescriptionPage.css";
import { useSelector } from "react-redux";
import axios from "../axios";
import { useEffect, useState } from "react";
import MovieDescriptionOverview from "../components/MovieDescriptionOverview";
import Nav from "../shared/Nav";
import MovieDescriptionTrailer from "../components/MovieDescriptionTrailer";
import MovieDescriptionSimilar from "../components/MovieDescriptionSimilar";
import { useParams } from "react-router-dom";

function MovieDescriptionPage() {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const { movie } = useSelector((state) => state.movie);
  const [movieInfo, setMovieInfo] = useState(null);
  const [chosenHeaderItem, setChosenHeaderItem] = useState(0);
  const params = useParams();

  function truncateDate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) : str;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        var request = await axios.get(
          `/tv/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        console.log(request.data.id);
        console.log(params.id);

        if (parseInt(request.data.id) !== parseInt(params.id)) {
          request = await axios.get(
            `/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
          );
        } else {
          if (
            !(
              request.data?.title === movie.title ||
              request.data?.name === movie.name ||
              request.data?.original_name === movie.original_name
            )
          ) {
            request = await axios.get(
              `/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
            );
          }
        }
        setMovieInfo(request.data);
      } catch (err) {
        request = await axios.get(
          `/movie/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovieInfo(request.data);
      }

      return request;
    }

    fetchData();
  }, [movie, params.id]);

  return (
    <div className="moviePage">
      <Nav />
      {movieInfo !== null ? (
        <div className="movieContent">
          <div className="moviePoster">
            {console.log(
              parseInt(movieInfo.id) === parseInt(params.id) ||
                typeof movieInfo.seasons === undefined
            )}
            <img
              src={`${base_url}${movieInfo?.poster_path}`}
              alt="Movie poster"
            ></img>
          </div>
          <div className="movieInformation">
            <h1 className="movieTitle">
              {movieInfo?.title || movieInfo?.name || movieInfo?.original_name}
            </h1>
            <div className="movieBasicInformation">
              {movieInfo !== null ? (
                <>
                  <h5>
                    {truncateDate(movieInfo?.first_air_date, 5) ||
                      truncateDate(movieInfo?.release_date, 5)}
                  </h5>
                  {movieInfo.hasOwnProperty("seasons") ? <h5>|</h5> : ""}

                  <h5>
                    {movieInfo.hasOwnProperty("seasons")
                      ? movieInfo.seasons.length === 1
                        ? movieInfo.seasons.length + " season"
                        : movieInfo.seasons.length + " seasons"
                      : ""}
                  </h5>
                  {movieInfo.hasOwnProperty("episode_run_time") ? (
                    <h5>|</h5>
                  ) : (
                    ""
                  )}
                  <h5>
                    {movieInfo.hasOwnProperty("episode_run_time")
                      ? movieInfo.episode_run_time[0] + " min"
                      : ""}
                  </h5>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="movieDescription">
              <div className="descriptionHeader">
                <h2
                  onClick={() => setChosenHeaderItem(0)}
                  className={`descriptionHeaderItem ${
                    chosenHeaderItem === 0 ? "chosenHeaderItem" : ""
                  }`}
                >
                  OVERVIEW
                </h2>
                <h2
                  onClick={() => setChosenHeaderItem(1)}
                  className={`descriptionHeaderItem ${
                    chosenHeaderItem === 1 ? "chosenHeaderItem" : ""
                  }`}
                >
                  TRAILERS & MORE
                </h2>
                <h2
                  onClick={() => setChosenHeaderItem(2)}
                  className={`descriptionHeaderItem ${
                    chosenHeaderItem === 2 ? "chosenHeaderItem" : ""
                  }`}
                >
                  MORE LIKE THIS
                </h2>
                <h2
                  onClick={() => setChosenHeaderItem(3)}
                  className={`descriptionHeaderItem ${
                    chosenHeaderItem === 3 ? "chosenHeaderItem" : ""
                  }`}
                >
                  REVIEWS
                </h2>
              </div>
              <MovieDescriptionOverview
                headerItem={chosenHeaderItem}
                movieInfo={movieInfo}
              />
              <MovieDescriptionTrailer headerItem={chosenHeaderItem} />
              <MovieDescriptionSimilar headerItem={chosenHeaderItem} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MovieDescriptionPage;
