import { useParams } from "react-router-dom";
import "./BrowsePage.css";
import ChosenMoviesGenreView from "./ChosenMoviesGenreView";
import ChosenTVGenreView from "./ChosenTVGenreView";
import DefaultBrowseView from "./DefaultBrowseView";
import Nav from "./Nav";
import SortingPanel from "./SortingPanel";

function BrowsePage() {
  const params = useParams();

  return (
    <div className="browsePage">
      <Nav />
      <div className="browseBody">
        <SortingPanel />
        {params.genreId === "default" ? (
          <DefaultBrowseView />
        ) : params.type === "movies" ? (
          <ChosenMoviesGenreView genreId={params} />
        ) : (
          <ChosenTVGenreView genreId={params} />
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
