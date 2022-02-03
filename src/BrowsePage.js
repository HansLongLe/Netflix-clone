import "./BrowsePage.css";
import DefaultBrowseView from "./DefaultBrowseView";
import Nav from "./Nav";
import SortingPanel from "./SortingPanel";

function BrowsePage() {
  return (
    <div className="browsePage">
      <Nav />
      <div className="browseBody">
        <SortingPanel />
        <DefaultBrowseView />
      </div>
    </div>
  );
}

export default BrowsePage;
