import React from "react";
import { useParams } from "react-router-dom";
import "./css/BrowsePage.css";
import ChosenMoviesGenreView from "../components/ChosenMoviesGenreView";
import ChosenTVGenreView from "../components/ChosenTVGenreView";
import DefaultBrowseView from "../components/DefaultBrowseView";
import Nav from "../shared/Nav";
import SearchByTextView from "../components/SearchedByTextView";
import SortingPanel from "../shared/SortingPanel";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function BrowsePage() {
  const params = useParams<"type">();

  return (
    <div className="browsePage">
      <Nav />
      <div className="browseBody">
        <SortingPanel />
        {params.type === "default" ? (
          <LazyLoadComponent>
            <DefaultBrowseView />
          </LazyLoadComponent>
        ) : params.type === "movies" ? (
          <LazyLoadComponent>
            <ChosenMoviesGenreView />
          </LazyLoadComponent>
        ) : params.type === "tv" ? (
          <LazyLoadComponent>
            <ChosenTVGenreView />
          </LazyLoadComponent>
        ) : (
          <LazyLoadComponent>
            <SearchByTextView />
          </LazyLoadComponent>
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
