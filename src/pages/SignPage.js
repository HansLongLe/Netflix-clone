import { useState } from "react";
import "./css/SignPage.css";
import { db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import EmailVerificationModal from "../components/EmailVerificationModal";

function SignPage() {
  const [signUp, setSignUp] = useState(false);
  const [delayedSignUp, setDelayedSignUp] = useState(false);
  const [delayedSignUp2, setDelayedSignUp2] = useState(false);
  const [defaultSign, setDefaultSign] = useState(true);
  const [visible, setVisible] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState([]);

  function changeLayout() {
    setSignUp(!signUp);
    setDefaultSign(false);
    setTimeout(() => {
      setDelayedSignUp(!delayedSignUp);
    }, 500);
    setTimeout(() => {
      setDelayedSignUp2(!delayedSignUp2);
    }, 640);
  }

  async function handleSignUpValidation() {
    let errors = [];
    let isValid = true;

    if (!fields["username"]) {
      isValid = false;
      errors["username"] = "Cannot be empty";
    }

    if (db.collection("users").onSnapshot === fields["username"]) {
      isValid = false;
      errors["username"] = "Username already exists.";
    }

    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      const username = (doc.id, "=>", doc.data().username);
      if (fields["username"] === username) {
        isValid = false;
        errors["username"] = "Username already exists";
      }
    });

    if (typeof fields["email"] !== undefined) {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2 &&
          lastDotPos - lastAtPos !== 1
        )
      ) {
        isValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    if (!fields["email"]) {
      isValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (!fields["password"] < 6) {
      isValid = false;
      errors["password"] = "Password should be at least 6 characters long";
    }
    if (!fields["password"]) {
      isValid = false;
      errors["password"] = "Cannot be empty";
    }
    if (typeof fields["repeatPassword"] !== undefined) {
      if (fields["repeatPassword"] !== fields["password"]) {
        isValid = false;
        errors["repeatPassword"] = "Does not match the first password";
      }
    }

    setErrors(errors);
    return isValid;
  }

  async function signUpFunction() {
    if (await handleSignUpValidation()) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          fields["email"],
          fields["password"]
        );
        db.collection("users").add({
          id: user.user.uid,
          username: fields["username"],
        });
        sendEmailVerification(auth.currentUser).catch((error) => {
          console.log("Email verification error", error);
        });
        setVisible(!visible);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  function toggleModal() {
    setVisible(!visible);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="signPage">
      <EmailVerificationModal visible={visible} toggle={toggleModal} />
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
        className={`defaultHelpLeftDiv  ${
          defaultSign ? "" : signUp ? "hiddenLeftSide" : "visibleLeftSide"
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
          <input
            className="emailInput"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
            name="email"
          ></input>
          <span className="errorMessage">{errors["email"]}</span>
          {delayedSignUp2 ? (
            <>
              <input
                className="usernameInput"
                placeholder="Username"
                onChange={(event) => handleChange(event)}
                name="username"
              ></input>
              <span className="errorMessage">{errors["username"]}</span>
            </>
          ) : (
            ""
          )}
          <input
            className="passwordInput"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
            name="password"
          ></input>
          <span className="errorMessage">{errors["password"]}</span>
          {delayedSignUp2 ? (
            <>
              <input
                className="passwordInput"
                placeholder="Repeat password"
                onChange={(event) => handleChange(event)}
                name="repeatPassword"
              ></input>
              <span className="errorMessage">{errors["repeatPassword"]}</span>
            </>
          ) : (
            ""
          )}
          <div className="signButtons">
            {delayedSignUp ? (
              <>
                <h2 className="signButton" onClick={() => signUpFunction()}>
                  Sign Up
                </h2>
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
      {defaultSign ? (
        ""
      ) : (
        <div
          className={`defaultHelpRightDiv  ${
            signUp ? "visibleRightSide" : "hiddenRightSide"
          }`}
        >
          <div className="netflixLogo">
            <a
              href="https://www.netflix.com/"
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                className="netflixLogoImg"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix logo"
              />
            </a>
          </div>
          <h1 className="netflixText">
            START NOW TO GET UNLIMITED MOVIES, TV SHOWS & MORE.
          </h1>
        </div>
      )}
    </div>
  );
}

export default SignPage;
