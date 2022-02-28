import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./css/Row.css";
import { useDispatch } from "react-redux";
import { setTrailerUrl } from "../redux/trailerSlice";
import movieTrailer from "movie-trailer";
import { setMovie } from "../redux/movieSlice";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import LoadingRowInBrowser from "../loadingComponents/LoadingRowInBrowser";
import IMovie from "../types/IMovie";

const base_url = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string;
  fetchUrl: string;
};

function RowInBrowser({ title, fetchUrl }: Props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
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

  const handleClick = (currentMovie: IMovie) => {
    movieTrailer(currentMovie?.name || "")
      .then((url: string) => {
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
      .catch((error: Error) => console.log(error));

    dispatch(setMovie(currentMovie));
  };

  return (
    <>
      <h2 className="row_title">{title}</h2>
      {loading ? (
        <LoadingRowInBrowser />
      ) : (
        <div className="row">
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
              {movies.map((tempMovie: IMovie) => (
                <SwiperSlide>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={{ pathname: `/description/${tempMovie.id}` }}
                  >
                    <LazyLoadImage
                      key={tempMovie.id}
                      onClick={() => handleClick(tempMovie)}
                      className="row_poster_in_browser"
                      src={`${base_url}${tempMovie.poster_path}`}
                      alt={tempMovie.name}
                      loading="lazy"
                    />

                    <div className="movieName">
                      {tempMovie?.title ||
                        tempMovie?.name ||
                        tempMovie?.original_name}
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}

export default RowInBrowser;
