import React from "react";
import ReactPlayer from "react-player";
import "./css/MovieDescriptionTrailer.css";
import { RootStateOrAny, useSelector } from "react-redux";

type Props = {
  headerItem: number;
};

function MovieDescriptionTrailer({ headerItem }: Props) {
  const { trailerUrl } = useSelector((state: RootStateOrAny) => state.trailer);
  return (
    <>
      {headerItem === 1 ? (
        trailerUrl[1] === "" || trailerUrl[1] === undefined ? (
          <p className="noTrailer">No trailer found</p>
        ) : (
          <div className="trailerAndmoreDiv">
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
