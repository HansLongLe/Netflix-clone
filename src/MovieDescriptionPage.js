import React from "react";
import "./MovieDescriptionPage.css";
import { useSelector } from "react-redux";
import axios from "./axios";
import { useEffect, useState } from "react";
import MovieDescriptionOverview from "./MovieDescriptionOverview";

function MovieDescriptionPage() {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const { movie } = useSelector((state) => state.movie);
  const [movieInfo, setMovieInfo] = useState(null);
  const [chosenHeaderItem, setChosenHeaderItem] = useState(0);

  function truncateDate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) : str;
  }

  useEffect(() => {
    async function fetchData() {
      var request = await axios.get(
        `/movie/${movie.id}?api_key=23840f43207af50d077b3fccc094a034&language=en-US`
      );
      if (
        request.data.title !== movie.name ||
        request.data.original_title !== movie.original_name ||
        request.data.name ||
        movie.name
      ) {
        request = await axios.get(
          `/tv/${movie.id}?api_key=23840f43207af50d077b3fccc094a034&language=en-US`
        );
        setMovieInfo(request.data);
      }
      console.log(request.data);
      console.log(movie);

      return request;
    }

    fetchData();
  }, [movie]);

  return (
    <div className="moviePage">
      <div className="movieHeader"></div>
      <div className="movieContent">
        <div className="moviePoster">
          <img
            src={`${base_url}${movie?.poster_path}`}
            alt="Movie poster"
          ></img>
        </div>
        <div className="movieInformation">
          <h1 className="movieTitle">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="movieBasicInformation">
            {movieInfo !== null ? (
              <>
                <h5>{truncateDate(movie.first_air_date, 5)}</h5>
                <h5>|</h5>
                <h5>
                  {movieInfo.seasons.length === 1
                    ? movieInfo.seasons.length + " season"
                    : movieInfo.seasons.length + " seasons"}
                </h5>
                <h5>|</h5>
                <h5>{movieInfo.episode_run_time[0]} min</h5>
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
                {console.log(chosenHeaderItem[0])}
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
            <MovieDescriptionOverview headerItem={chosenHeaderItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDescriptionPage;
