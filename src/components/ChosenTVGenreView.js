import axios from "../axios";
import { useEffect, useState } from "react";
import "./css/SortingByView.css";
import { useDispatch } from "react-redux";
import { setMovie } from "../redux/movieSlice";
import { Link } from "react-router-dom";

function ChosenTVGenreView({ genreId }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [tvs, setTvs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId.sortBy}`
      );
      setTvs(request.data.results);
      return request;
    }
    fetchData();
  }, [genreId]);

  function handleClick(tempTvs) {
    dispatch(setMovie(tempTvs));
  }
  return (
    <div className="contentView">
      {tvs.map((tempTvs) => (
        <Link to={{ pathname: `/description/${tempTvs.id}` }}>
          <div className="container">
            <img
              key={tempTvs.id}
              onClick={() => handleClick(tempTvs)}
              className={"posterImage"}
              src={`${base_url}${tempTvs.poster_path}`}
              alt={tempTvs.name}
            />
            <h3 className="contentName">
              {tempTvs?.title || tempTvs?.name || tempTvs?.original_name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChosenTVGenreView;
