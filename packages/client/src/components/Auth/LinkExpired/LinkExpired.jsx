import React from "react";
import { useNavigate } from "react-router-dom";

const LinkExpired = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/auth");
  };
  return (
    <>
      <div className="link-expired-container">
        <div className="close-icon">X</div>
        <h1 className="title">Authentication Failed!</h1>
        <p className="message">
          Your activation link may have expired. Please sign up with your
          details again.
        </p>
      </div>

      <div className="details-container">
        <div className="details-card">
          <div className="details-header">Activation Link Expired</div>
          <div className="details-content">
            <p>
              Activation link access expires after 10 minutes and can only be
              used once.
            </p>
            <button className="login-button" onClick={handleNavigate}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkExpired;
