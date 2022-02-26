import { useState, useEffect } from "react";
import "./css/SignPage.css";
import { db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import EmailVerificationModal from "../components/EmailVerificationModal";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";
import LoadingPage from "./LoadingPage";

function SignPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  function changeLayout() {
    setSignUp(!signUp);
    setDefaultSign(false);
    setTimeout(() => {
      setDelayedSignUp(!delayedSignUp);
    }, 630);
    setTimeout(() => {
      setDelayedSignUp2(!delayedSignUp2);
    }, 640);
  }

  function handleKeyDownSignUp(event) {
    if (event.key === "Enter") {
      signUpFunction();
    }
  }

  function handleKeyDownSignIn(event) {
    if (event.key === "Enter") {
      signInFunction();
    }
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

    if (fields["password"] < 6) {
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

  async function handleSignInValidation() {
    let errors = [];
    let isValid = true;

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

    if (!fields["password"]) {
      isValid = false;
      errors["password"] = "Cannot be empty";
    }

    setErrors(errors);
    return isValid;
  }

  async function signInFunction() {
    console.log(handleSignInValidation());

    if (await handleSignInValidation()) {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          fields["email"],
          fields["password"]
        );
        const usersRef = db.collection("users");
        const snapshot = await usersRef.get();
        let username = "";
        snapshot.forEach((doc) => {
          username = (userCredentials.user.uid, "=>", doc.data().username);
        });
        const currentUser = {
          email: userCredentials.user.email,
          username: username,
          verified: userCredentials.user.emailVerified,
        };
        dispatch(setCurrentUser(currentUser));
        window.location.href = "/";
      } catch (error) {
        console.log(error.message);
      }
    }
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
        let tempErrors = errors;
        tempErrors["email"] = "Assigned to an existing account";
        setErrors(tempErrors);
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

  function signUsingGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const currentUser = {
          email: result.user.email,
          username: result.user.displayName,
          verified: true,
        };
        dispatch(setCurrentUser(currentUser));
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
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
                onKeyDown={(event) => {
                  delayedSignUp2
                    ? handleKeyDownSignUp(event)
                    : handleKeyDownSignIn(event);
                }}
                name="email"
              ></input>
              <span className="errorMessage">{errors["email"]}</span>
              {delayedSignUp2 ? (
                <>
                  <input
                    className="usernameInput"
                    placeholder="Username"
                    onChange={(event) => handleChange(event)}
                    onKeyDown={(event) => handleKeyDownSignUp(event)}
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
                onKeyDown={(event) => {
                  delayedSignUp2
                    ? handleKeyDownSignUp(event)
                    : handleKeyDownSignIn(event);
                }}
                name="password"
                type={"password"}
              ></input>
              <span className="errorMessage">{errors["password"]}</span>
              {delayedSignUp2 ? (
                <>
                  <input
                    className="passwordInput"
                    placeholder="Repeat password"
                    onChange={(event) => handleChange(event)}
                    onKeyDown={(event) => handleKeyDownSignUp(event)}
                    name="repeatPassword"
                    type={"password"}
                  ></input>
                  <span className="errorMessage">
                    {errors["repeatPassword"]}
                  </span>
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
                    <p
                      onClick={() => changeLayout()}
                      className="otherSignButton"
                    >
                      Have an account?
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="signButton" onClick={() => signInFunction()}>
                      Sign In
                    </h2>
                    <div
                      className="signButton googleButton"
                      onClick={() => signUsingGoogle()}
                    >
                      <img
                        src="https://freesvg.org/img/1534129544.png"
                        alt="google icon"
                        className="googleIcon"
                      />
                      <p className="googleText">
                        <b>Sign in with Google</b>
                      </p>
                    </div>
                    <p
                      onClick={() => changeLayout()}
                      className="otherSignButton"
                    >
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
      )}
    </>
  );
}

export default SignPage;
