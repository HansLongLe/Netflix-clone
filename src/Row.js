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

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const { trailerUrl } = useSelector((state) => state.trailer);
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
      {title === "NETFLIX ORIGINALS" ? (
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
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie, trailerUrl)}
                  className={isLargeRow ? "row_posterLarge" : "row_poster"}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="row_posters">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            navigation={true}
            breakpoints={{
              900: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie, trailerUrl)}
                  className={isLargeRow ? "row_posterLarge" : "row_poster"}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Row;
