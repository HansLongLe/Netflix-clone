import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./css/Row.css";
import { useSelector, useDispatch } from "react-redux";
import { setTrailerUrl } from "../redux/trailerSlice";
import movieTrailer from "movie-trailer";
import { setMovie } from "../redux/movieSlice";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import LoadingRow from "../loadingComponents/LoadingRow";
import { LazyLoadImage } from "react-lazy-load-image-component";

const base_url = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean;
};

function Row({ title, fetchUrl, isLargeRow }: Props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { movie } = useSelector((state: any) => state.movie);
  const dispatch = useDispatch();

  SwiperCore.use([Navigation]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setLoading(false);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (currentMovie: any) => {
    movieTrailer(currentMovie?.name || "")
      .then((url: any) => {
        if (url === null) {
          dispatch(setTrailerUrl(""));
        } else {
          const urlParameters = new URLSearchParams(new URL(url).search);
          dispatch(
            setTrailerUrl([
              urlParameters.get("v"),
              `https://www.youtube.com/embed/${urlParameters.get("v")}`,
            ])
          );
        }
      })
      .catch((error: any) => console.log(error));

    dispatch(setMovie(currentMovie));
  };

  return (
    <>
      {loading ? (
        <LoadingRow />
      ) : (
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
                {movies.map((tempMovie: any) => (
                  <SwiperSlide key={tempMovie.id}>
                    <LazyLoadImage
                      loading="lazy"
                      key={tempMovie.id}
                      onClick={() => handleClick(tempMovie)}
                      className={`${
                        isLargeRow ? "row_posterLarge " : "row_poster "
                      } ${tempMovie.id === movie.id ? "chosenMovie" : ""}`}
                      src={`${base_url}${
                        isLargeRow
                          ? tempMovie.poster_path
                          : tempMovie.backdrop_path
                      }`}
                      alt={tempMovie.name}
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
                    spaceBetween: 50,
                  },
                }}
                className="mySwiper"
              >
                {movies.map((tempMovie: any) => (
                  <SwiperSlide>
                    <LazyLoadImage
                      loading="lazy"
                      key={tempMovie.id}
                      onClick={() => handleClick(tempMovie)}
                      className={`${
                        isLargeRow ? "row_posterLarge " : "row_poster "
                      } ${tempMovie.id === movie.id ? "chosenMovie" : ""}`}
                      src={`${base_url}${
                        isLargeRow
                          ? tempMovie.poster_path
                          : tempMovie.backdrop_path
                      }`}
                      alt={tempMovie.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Row;
