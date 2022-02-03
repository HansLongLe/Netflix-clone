import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrailerUrl } from "./redux/trailerSlice";
import movieTrailer from "movie-trailer";
import { setMovie } from "./redux/movieSlice";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function RowInBrowser({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const { trailerUrl } = useSelector((state) => state.trailer);
  const { movie } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  SwiperCore.use([Navigation]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie, trailerUrl) => {
    dispatch(setMovie(movie));

    if (trailerUrl) {
      dispatch(setTrailerUrl(""));
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParameters = new URLSearchParams(new URL(url).search);
          dispatch(
            setTrailerUrl([
              urlParameters.get("v"),
              `https://www.youtube.com/embed/${urlParameters.get("v")}`,
            ])
          );
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_posters">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          loop={true}
          navigation={true}
          breakpoints={{
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 15,
            },
          }}
          className="mySwiper"
        >
          {movies.map((tempMovie) => (
            <SwiperSlide>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={{ pathname: `/movies/${tempMovie.id}` }}
              >
                <img
                  key={tempMovie.id}
                  onClick={() => handleClick(tempMovie, trailerUrl)}
                  className="row_poster_in_browser"
                  src={`${base_url}${tempMovie.poster_path}`}
                  alt={tempMovie.name}
                />
                <h3 className="movieName">
                  {tempMovie?.title ||
                    tempMovie?.name ||
                    tempMovie?.original_name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      ) )
    </div>
  );
}

export default RowInBrowser;
