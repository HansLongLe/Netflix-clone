import React, { useState } from "react";
import "./css/Nav.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";
import { FiLogOut } from "react-icons/fi";
import { HiViewList } from "react-icons/hi";

function Nav() {
  const [searchedText, setSearchText] = useState("");
  const { currentUser } = useSelector((state) => state.currentUser);
  const [visible, setVisible] = useState(false);
  const [defaultMenu, setDefaultMenu] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      window.location.href = `/browse/search/${searchedText}`;
    }
  }

  function toggleBurger() {
    setVisible(!visible);
    setDefaultMenu(false);
  }

  function logOut() {
    dispatch(setCurrentUser(""));
    window.location.href = "/sign";
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
      {currentUser ? (
        <>
          <img
            onClick={() => toggleBurger()}
            className={`nav_avatar signedIn ${visible ? "clicked" : ""}`}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix avatar"
          />

          {visible ? (
            <ul
              className={`${
                Object.keys(params).length === 0 ? "menuForMainPage" : "menu"
              } menuShow`}
            >
              <li className="username">{currentUser.username}</li>

              <li className="burgerItem">
                MyList
                <HiViewList style={{ marginLeft: "5%" }} />
              </li>

              <li className="burgerItem" onClick={() => logOut()}>
                Log out
                <FiLogOut style={{ marginLeft: "5%" }} />
              </li>
              {currentUser.verified ? (
                ""
              ) : (
                <li
                  style={{
                    position: "absolute",
                    color: "rgb(140, 140, 140)",
                    fontSize: "70%",
                    marginTop: "-50%",
                    marginLeft: "-15%",
                  }}
                >
                  Not verified{" "}
                </li>
              )}
            </ul>
          ) : (
            <ul
              className={`${
                Object.keys(params).length === 0 ? "menuForMainPage" : "menu"
              } ${defaultMenu ? "" : " menuHide"}`}
            >
              <li className="username">{currentUser.username}</li>

              <li className="burgerItem">
                MyList
                <HiViewList style={{ marginLeft: "5%" }} />
              </li>
              <li className="burgerItem" onClick={() => logOut()}>
                Log out
                <FiLogOut style={{ marginLeft: "5%" }} />
              </li>

              {currentUser.verified ? (
                ""
              ) : (
                <li
                  style={{
                    position: "absolute",
                    color: "rgb(140, 140, 140)",
                    fontSize: "70%",
                    marginTop: "-50%",
                    marginLeft: "-15%",
                  }}
                >
                  Not verified{" "}
                </li>
              )}
            </ul>
          )}
        </>
      ) : (
        <Link to={{ pathname: "/sign" }} style={{ color: "white" }}>
          <FaUserAlt className="nav_avatar notSignedIn" />
        </Link>
      )}
    </div>
  );
}

export default Nav;
