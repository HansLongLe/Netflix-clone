import { useParams } from "react-router-dom";
import "./css/BrowsePage.css";
import ChosenMoviesGenreView from "../components/ChosenMoviesGenreView";
import ChosenTVGenreView from "../components/ChosenTVGenreView";
import DefaultBrowseView from "../components/DefaultBrowseView";
import Nav from "../Nav";
import SearchByTextView from "../components/SearchedByTextView";
import SortingPanel from "../shared/SortingPanel";

function BrowsePage() {
  const params = useParams();

  return (
    <div className="browsePage">
      <Nav />
      <div className="browseBody">
        <SortingPanel />
        {params.type === "default" ? (
          <DefaultBrowseView />
        ) : params.type === "movies" ? (
          <ChosenMoviesGenreView genreId={params} />
        ) : params.type === "tv" ? (
          <ChosenTVGenreView genreId={params} />
        ) : (
          <SearchByTextView searchedText={params} />
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
