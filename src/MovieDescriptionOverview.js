import React from "react";
import "./MovieDescriptionOverview.css";
import { useSelector } from "react-redux";
import axios from "./axios";
import { useEffect, useState } from "react";

function MovieDescriptionOverview({ headerItem }) {
  const { movie } = useSelector((state) => state.movie);
  const [movieInfo, setMovieInfo] = useState(null);

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
    <div className="descriptionBody">
      {headerItem === 0 ? (
        <>
          <p className="overview">{movie.overview}</p>
          <div className="lowerDescriptionBody">
            <div className="leftSideDescriptionBody">
              <p className="storyByTitle">
                <b>Story by</b>
              </p>
              <p className="productionTitle">
                <b>Production company</b>
              </p>
              <p className="movieGenresTitle">
                <b>Genres</b>
              </p>
            </div>
            <div className="rightSideDescriptionBody">
              <p className="storyByInformation">
                {movieInfo !== null
                  ? movieInfo.created_by.map((creator, i) =>
                      i + 1 !== movieInfo.created_by.length
                        ? creator.name + ", "
                        : creator.name
                    )
                  : ""}
              </p>
              <p className="productionInformation">
                {movieInfo !== null
                  ? movieInfo.production_companies.map((company, i) =>
                      i + 1 !== movieInfo.production_companies.length
                        ? company.name + ", "
                        : company.name
                    )
                  : ""}
              </p>
              <p className="movieGenresInformation">
                {movieInfo !== null
                  ? movieInfo.genres.map((genre, i) =>
                      i + 1 !== movieInfo.genres.length
                        ? genre.name + ", "
                        : genre.name
                    )
                  : ""}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MovieDescriptionOverview;
