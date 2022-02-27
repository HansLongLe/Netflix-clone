import React from "react";
import "./css/App.css";
import Row from "../components/Row";
import requests from "../requests";
import Banner from "../shared/Banner";

function App() {
  return (
    <div className="App">
      <>
        <article className="rows">
          <section>
            <Row
              title="NETFLIX ORIGINALS"
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow={true}
            />
          </section>
          <section>
            <Row
              title="Trending Now"
              fetchUrl={requests.fetchTrending}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Top rated"
              fetchUrl={requests.fetchTopRated}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Action movies"
              fetchUrl={requests.fetchActionMovies}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Comedy movies"
              fetchUrl={requests.fetchComedyMovies}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Horror movies"
              fetchUrl={requests.fetchHorrorMovies}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Romance movies"
              fetchUrl={requests.fetchRomanceMovies}
              isLargeRow={false}
            />
          </section>
          <section>
            <Row
              title="Documentaries"
              fetchUrl={requests.fetchDocumentaries}
              isLargeRow={false}
            />
          </section>
        </article>
        <div className="header">
          <Banner />
        </div>
      </>
    </div>
  );
}

export default App;
