import { useState } from "react";
import "./css/SignPage.css";

function SignPage() {
  const [signUp, setSignUp] = useState(false);
  const [delayedSignUp, setDelayedSignUp] = useState(false);
  const [delayedSignUp2, setDelayedSignUp2] = useState(false);
  const [defaultSign, setDefaultSign] = useState(true);

  function changeLayout() {
    setSignUp(!signUp);
    setDefaultSign(false);
    setTimeout(() => {
      setDelayedSignUp(!delayedSignUp);
    }, 480);
    setTimeout(() => {
      setDelayedSignUp2(!delayedSignUp2);
    }, 650);
  }
  return (
    <div className="signPage">
      <div
        className={
          defaultSign
            ? "defaultLeftSide"
            : signUp
            ? "defaultLeftSide signUpRightSide"
            : "defaultLeftSide signInLeftSide"
        }
      ></div>
      <div
        className={`defaultHelpDiv  ${
          signUp ? "hiddenLeftSide" : "visibleLeftSide"
        }`}
      >
        <div className="netflixLogo">
          <a href="https://www.netflix.com/" target={"_blank"} rel="noreferrer">
            <img
              className="netflixLogoImg"
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix logo"
            />
          </a>
        </div>
        <h1 className="netflixText">
          WATCH TV SHOWS & MOVIES ANYWHERE AND ANYTIME.
        </h1>
      </div>
      <div
        className={
          defaultSign
            ? "defaultRightSide"
            : signUp
            ? "defaultRightSide signUpLeftSide"
            : "defaultRightSide signInRightSide"
        }
      >
        <div className="signContainer">
          <img
            className="netflixLogoSmallImg"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix logo"
          />
          <input className="emailInput" placeholder="Email"></input>
          {delayedSignUp2 ? (
            <input className="usernameInput" placeholder="Username"></input>
          ) : (
            ""
          )}
          <input className="passwordInput" placeholder="Password"></input>
          {delayedSignUp2 ? (
            <input
              className="passwordInput"
              placeholder="Repeat password"
            ></input>
          ) : (
            ""
          )}
          <div className="signButtons">
            {delayedSignUp ? (
              <>
                <h2 className="signButton">Sign Up</h2>
                <p onClick={() => changeLayout()} className="signUp">
                  Have an account?
                </p>
              </>
            ) : (
              <>
                <h2 className="signButton">Sign In</h2>
                <p onClick={() => changeLayout()} className="signUp">
                  Create account
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;
