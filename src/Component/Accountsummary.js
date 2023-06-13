import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSummary() {
  const navigate = useNavigate();
  const [ac, setAc] = useState("");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const getSum = async () => {
    setShowMsg(false);
    try {
      const accountResponse = await axios.get("http://localhost:3000/account");
      const accountData = accountResponse.data.filter(
        (item) => item.acno === ac && item.pin === pin
      );

      if (accountData.length > 0) {
        console.log("Account verified");
        const mytranResponse = await axios.get("http://localhost:3000/mytran");
        const mytranData = mytranResponse.data.filter(
          (item) => item.acno === ac
        );
        console.log(mytranData);
        navigate("/show", { state: { accountData, mytranData } });
      } else {
        console.log("Invalid pin or account number");
        setMsg("Invalid pin or account number");
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("An error occurred");
    }
    setShowMsg(true);
  };

  const handleDismiss = () => {
    setShowMsg(false); // Hide the message box
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <center>
          <h1>Account Summary Page</h1>
        </center>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row mb-10">
            <label
              htmlFor="colFormLabel"
              className="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Account Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="colFormLabel"
                placeholder="Account Number"
                onInput={(e) => setAc(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="colFormLabel"
              className="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Pin
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="colFormLabel"
                placeholder="Pin number"
                onInput={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-10">
              <div className="input-group"></div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-10"></div>
          </div>
          <div className="col-12">
            <button type="button" className="btn btn-success" onClick={getSum}>
              Get Summary
            </button>
          </div>

          <br />
          <br />
          <br />
          <div className="row mb-3">
            <div className="col-sm-10">
              {showMsg && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {msg}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={handleDismiss}
                  ></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
