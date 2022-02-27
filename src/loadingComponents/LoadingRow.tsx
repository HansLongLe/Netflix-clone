import React from "react";
import "../components/css/Row.css";

function LoadingRow() {
  return (
    <>
      <div className="loadingRow">
        <div className="loadingMovie"></div>
        <div className="loadingMovie"></div>
        <div className="loadingMovie"></div>
        <div className="loadingMovie"></div>
      </div>
    </>
  );
}

export default LoadingRow;
