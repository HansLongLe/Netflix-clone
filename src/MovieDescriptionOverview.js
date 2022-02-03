import React from "react";
import "./MovieDescriptionOverview.css";
import { useSelector } from "react-redux";

function MovieDescriptionOverview({ headerItem, movieInfo }) {
  const { movie } = useSelector((state) => state.movie);
  return (
    <div className="descriptionBody">
      {headerItem === 0 ? (
        <>
          <p className="overview">{movie.overview}</p>
          <div className="lowerDescriptionBody">
            <div className="leftSideDescriptionBody">
              {movieInfo !== null ? (
                movieInfo.hasOwnProperty("created_by") ? (
                  <p className="storyByTitle">
                    <b>Story by</b>
                  </p>
                ) : (
                  <p className="movieStatusTitle">
                    <b>Status</b>
                  </p>
                )
              ) : (
                ""
              )}

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
                  ? movieInfo.hasOwnProperty("created_by")
                    ? movieInfo.created_by.map((creator, i) =>
                        i + 1 !== movieInfo.created_by.length
                          ? creator.name + ", "
                          : creator.name
                      )
                    : movieInfo.status
                  : ""}
              </p>
              <p className="productionInformation">
                {movieInfo !== null
                  ? movieInfo.hasOwnProperty("production_companies")
                    ? movieInfo.production_companies.map((company, i) =>
                        i + 1 !== movieInfo.production_companies.length
                          ? company.name + ", "
                          : company.name
                      )
                    : ""
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
