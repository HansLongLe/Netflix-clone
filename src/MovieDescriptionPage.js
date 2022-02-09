import React from "react";
import "./MovieDescriptionPage.css";
import { useSelector } from "react-redux";
import axios from "./axios";
import { useEffect, useState } from "react";
import MovieDescriptionOverview from "./MovieDescriptionOverview";
import Nav from "./Nav";
import MovieDescriptionTrailer from "./MovieDescriptionTrailer";
import MovieDescriptionSimilar from "./MovieDescriptionSimilar";
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
      //The only problem here is that whenever the user will go back to the previous page
      // when after selecting a similar tv or movie, there might be a different movie or tv,
      // because of the state, as the state is not being setted when going back
      try {
        var request = await axios.get(
          `/tv/${params.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
        );
        if (
          !(
            (request.data.original_title !== undefined &&
              movie.original_title !== undefined &&
              request.data.original_title === movie.original_title) ||
            (request.data.original_name !== undefined &&
              movie.original_name !== undefined &&
              request.data.original_name === movie.original_name)
          )
        ) {
          request = await axios.get(
            `/movie/${params.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
          );
        }
        setMovieInfo(request.data);
      } catch (err) {
        request = await axios.get(
          `/movie/${params.id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
        );
        setMovieInfo(request.data);
      }

      console.log(request.data);
      console.log(movie);

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
