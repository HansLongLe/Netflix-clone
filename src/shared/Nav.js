import React, { useState } from "react";
import "./css/Nav.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Nav() {
  const [searchedText, setSearchText] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      window.location.href = `/browse/search/${searchedText}`;
      console.log("hello");
    }
  }

  return (
    <div className="nav">
      <Link to={{ pathname: "/" }}>
        <img
          className="nav_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix logo"
        />
      </Link>
      <Link to={{ pathname: `/browse/default/default` }}>
        <div className="browseDiv">Browse</div>
      </Link>
      <div className="searchDiv">
        <Link
          to={{ pathname: `/browse/search/${searchedText}` }}
          style={{ color: "rgb(112, 112, 112)" }}
        >
          <AiOutlineSearch className="searchIcon" />
        </Link>
        <input
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
          type={"text"}
          className="searchBox"
          placeholder="Search"
        ></input>
      </div>
      <Link to={{ pathname: "/sign" }} style={{ color: "white" }}>
        <FaUserAlt className="nav_avatar notSignedIn" />
      </Link>
      {/* <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
      /> */}
    </div>
  );
}

export default Nav;
