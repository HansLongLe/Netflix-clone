import React, { useEffect, useState } from "react";
import "./Nav.css";
import { AiOutlineSearch } from "react-icons/ai";

function Nav() {
  return (
    <div className="nav">
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
      />
      <div className="searchDiv">
        <AiOutlineSearch className="searchIcon" />
        <input type={"text"} className="searchBox" placeholder="Search"></input>
      </div>
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
      />
    </div>
  );
}

export default Nav;
