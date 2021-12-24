import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Banner />
      </div>
      <article className="rows">
        <section>
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
        </section>
        <section>
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        </section>
        <section>
          <Row title="Top rated" fetchUrl={requests.fetchTopRated} />
        </section>
        <section>
          <Row title="Action movies" fetchUrl={requests.fetchActionMovies} />
        </section>
        <section>
          <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />
        </section>
        <section>
          <Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
        </section>
        <section>
          <Row title="Romance movies" fetchUrl={requests.fetchRomanceMovies} />
        </section>
        <section>
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </section>
      </article>
      <Nav />
    </div>
  );
}

export default App;
