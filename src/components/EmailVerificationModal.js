import React from "react";
import "./css/EmailVerificationModal.css";
import { Link } from "react-router-dom";

const EmailVerificationModal = ({ visible, toggle }) => {
  return (
    <>
      {visible ? (
        <div className="modal">
          <div className="modal-pop" role="dialog" aria-modal="true">
            <>
              <img
                className="modalImage"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix logo"
              />
              <h3 className="modalHeader">
                Your account has been successfully registered.{" "}
              </h3>
              <p className="modalText">
                A verification message has been sent to your email, please
                follow the instrunctions written in the email to activate your
                account.
              </p>
              <Link to={{ pathname: "/sign" }} style={{ color: "white" }}>
                <button className="okButton" type="button" onClick={toggle}>
                  Ok
                </button>
              </Link>
            </>
          </div>
          <div className="modal-overlay"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EmailVerificationModal;
