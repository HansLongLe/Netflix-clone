import ReactPlayer from "react-player";
import "./MovieDescriptionTrailer.css";
import { useSelector } from "react-redux";

function MovieDescriptionTrailer({ headerItem }) {
  const { trailerUrl } = useSelector((state) => state.trailer);
  return (
    <>
      {headerItem === 1 ? (
        trailerUrl[1] === "" || trailerUrl[1] === undefined ? (
          <p className="noTrailer">No trailer found</p>
        ) : (
          <div className="trailerAndmoreDiv">
            {console.log(trailerUrl[1])}
            <ReactPlayer
              repeat
              className="react-player"
              url={trailerUrl[1]}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                  },
                },
              }}
            />
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default MovieDescriptionTrailer;
