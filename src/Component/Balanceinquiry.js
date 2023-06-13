import axios from "axios";
import React, { useState } from "react";

function Balanceinquiry() {
  var [ac, setAc] = useState("");
  var [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  var getBalance = async () => {
    setShowMsg(false);
    var res = await axios.get("http://localhost:3000/account");
    var dt = res.data.filter((item) => item.acno == ac && item.pin == pin);
    if (dt.length > 0) {
      console.log("Account verify");
      var camt = parseInt(dt[0].amount);

      setMsg(`Your Current account balance is ${camt}`);
    } else {
      setMsg("Invalid account number or pin");
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
          <h1> Balance Inquiry Page</h1>
        </center>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div class="row mb-10">
            <label
              for="colFormLabel"
              class="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Account Number
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="colFormLabel"
                placeholder="Account Number"
                onChange={(e) => setAc(e.target.value)}
              />
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="colFormLabel"
              class="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Pin
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="colFormLabel"
                placeholder="Pin number"
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-10">
              <div className="input-group"></div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-sm-10"></div>
          </div>
          <div class="col-12">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => getBalance()}
            >
              Check Balance
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

export default Balanceinquiry;
