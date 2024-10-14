import React from "react";
import { useNavigate } from "react-router-dom";

import "./AccountConfirmation.css";

const AccountConfirmation = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/auth");
  };
  return (
    <>
      <div className="confirmation-container">
        <button
          className="check-button"
          onClick={handleNavigate}
          aria-label="Done"
        >
          Done
        </button>

        <h1 className="confirmation-text">Your Account has been</h1>
        <h1 className="confirmation-text">successfully created</h1>
      </div>

      <div className="content-box">
        <div className="content-inner">
          <div className="email-info">
            <p className="email-text">Check your e-mail inbox now...</p>
          </div>

          <div className="email-details">
            <p className="email-details-text">
              We've sent a verification link to your email address. Please check
              your email inbox or spam folder and verify your email address
              within 10 minutes.
            </p>

            <button className="back-to-login-button" onClick={handleNavigate}>
              Back to login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountConfirmation;
