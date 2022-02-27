import React from "react";
import "./css/DefaultBrowseView.css";
import RowInBrowser from "./RowInBrowser";
import requests from "../requests";

function DefaultBrowseView() {
  return (
    <div className="movieViewDiv">
      <RowInBrowser
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />

      <RowInBrowser title="Trending Now" fetchUrl={requests.fetchTrending} />

      <RowInBrowser title="Top rated" fetchUrl={requests.fetchTopRated} />

      <RowInBrowser
        title="Action movies"
        fetchUrl={requests.fetchActionMovies}
      />

      <RowInBrowser
        title="Comedy movies"
        fetchUrl={requests.fetchComedyMovies}
      />

      <RowInBrowser
        title="Horror movies"
        fetchUrl={requests.fetchHorrorMovies}
      />

      <RowInBrowser
        title="Romance movies"
        fetchUrl={requests.fetchRomanceMovies}
      />

      <RowInBrowser
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default DefaultBrowseView;
