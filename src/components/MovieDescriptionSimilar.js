import "./css/MovieDescriptionSimilar.css";
import { useEffect, useState } from "react";
import axios from "../axios";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { setMovie } from "../redux/movieSlice";
import { useDispatch } from "react-redux";

function MovieDescriptionSimilar({ headerItem }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [similarMovies, setSimilarMovies] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        var request = await axios.get(
          `/movie/${params.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        if (request.data.total_results === 0) {
          request = await axios.get(
            `/tv/${params.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
          );
        }
        setSimilarMovies(request.data);
      } catch (err) {
        request = await axios.get(
          `/tv/${params.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setSimilarMovies(request.data);
      }
      return request;
    }
    fetchData();
  }, [params.id]);

  function handleClick(similarMovie) {
    dispatch(setMovie(similarMovie));
  }

  return (
    <>
      {headerItem === 2 ? (
        similarMovies !== null ? (
          <div className="moreLikeThisDiv">
            <Swiper
              slidesPerView={1}
              spaceBetween={5}
              loop={true}
              navigation={true}
              breakpoints={{
                600: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {console.log(similarMovies)}
              {similarMovies.results.map((similarMovie) => (
                <>
                  {similarMovie.backdrop_path !== null ? (
                    <SwiperSlide>
                      <Link
                        to={{ pathname: `/description/${similarMovie.id}` }}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <img
                          className="similarMovieImg"
                          key={similarMovie.id}
                          src={`${base_url}${similarMovie.backdrop_path}`}
                          alt="similar movie"
                          onClick={() => handleClick(similarMovie)}
                        />
                        <h3 className="similarMovieTitle">
                          {similarMovie?.title ||
                            similarMovie.name ||
                            similarMovie?.original_name}
                        </h3>
                      </Link>
                    </SwiperSlide>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Swiper>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}

export default MovieDescriptionSimilar;
