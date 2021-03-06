import React from "react";
import ICreatedBy from "../types/ICreatedBy";
import IGenre from "../types/IGenre";
import IMovie from "../types/IMovie";
import IProductionCompany from "../types/IProductionCompany";
import "./css/MovieDescriptionOverview.css";

type Props = {
  headerItem: number;
  movieInfo: IMovie;
};

function MovieDescriptionOverview({ headerItem, movieInfo }: Props) {
  return (
    <div className="descriptionBody">
      {headerItem === 0 && movieInfo !== undefined ? (
        <>
          <p className="overview">{movieInfo.overview}</p>
          <div className="lowerDescriptionBody">
            <div className="leftSideDescriptionBody">
              {movieInfo.hasOwnProperty("created_by") ? (
                <p className="storyByTitle">
                  <b>Story by</b>
                </p>
              ) : (
                <p className="movieStatusTitle">
                  <b>Status</b>
                </p>
              )}

              <p className="productionTitle">
                <b>Production company</b>
              </p>
              <p className="movieGenresTitle">
                <b>Genres</b>
              </p>
            </div>
            {console.log(movieInfo)}
            <div className="rightSideDescriptionBody">
              <p className="storyByInformation">
                {movieInfo.hasOwnProperty("created_by")
                  ? movieInfo.created_by!.map(
                      (creator: ICreatedBy, i: number) =>
                        i + 1 !== movieInfo.created_by!.length
                          ? creator.name + ", "
                          : creator.name
                    )
                  : movieInfo.status}
              </p>
              <p className="productionInformation">
                {movieInfo.hasOwnProperty("production_companies")
                  ? movieInfo.production_companies!.map(
                      (company: IProductionCompany, i: number) =>
                        i + 1 !== movieInfo.production_companies!.length
                          ? company.name + ", "
                          : company.name
                    )
                  : ""}
              </p>
              <p className="movieGenresInformation">
                {movieInfo.genres!.map((genre: IGenre, i: number) =>
                  i + 1 !== movieInfo.genres!.length
                    ? genre.name + ", "
                    : genre.name
                )}
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
