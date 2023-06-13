import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="row">
        <div className="col-md-2" style={{ height: "180px" }}>
          <img src="bank.png" style={{ height: "100%" }} />
        </div>
        <div
          className="col-md-10"
          style={{
            height: "180px",
            background: "linear-gradient(to right, #005AA7, #FFFDE4)",
            color: "#333",
            display: "flex",
            alignItems: "center",
            paddingLeft: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "sans-serif",
                fontSize: "3rem",
                margin: "0",
              }}
            >
              My Banking App
            </h1>
            <hr style={{ margin: "1rem 0" }} />
            <h3
              style={{
                fontFamily: "sans-serif",
                fontSize: "1.5rem",
                margin: "0",
              }}
            >
              Bank at your Door Steps
            </h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1 navbar navbar-expand-lg bg-body-tertiary bg-dark"></div>
        <div className="col-10 navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav" style={{ justifyContent: "center" }}>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/with">
                    Withdrawl
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/deposit">
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/fundtra">
                    Fund Transfer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/accsum">
                    Account Summary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/balinq">
                    Balance Inquiry
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pinchange">
                    Pin Change
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-1 navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav" style={{ justifyContent: "center" }}>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/acc"
                  >
                    Login/Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Nav;
