import axios from "axios";
import React, { useState } from "react";

function Deposit() {
  var [ac, setAc] = useState("");
  var [pin, setPin] = useState("");
  var [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  var Addmoney = async () => {
    setShowMsg(false);

    try {
      // Check account and pin
      var res = await axios.get("http://localhost:3000/account");
      var dt = res.data.filter((item) => item.acno === ac && item.pin === pin);

      if (dt.length > 0) {
        console.log("Account verified");

        // Deposit amount
        var camt = parseInt(dt[0].amount);
        var id = dt[0].id;
        camt = camt + parseInt(amt);
        var dt1 = dt[0];
        dt1.amount = camt;
        var today = new Date();
        var time;
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        var hh = String(today.getHours()).padStart(2, "0");
        var min = String(today.getMinutes()).padStart(2, "0");
        var ss = String(today.getSeconds()).padStart(2, "0");

        today = mm + "/" + dd + "/" + yyyy + " ";
        time = hh + ":" + min + ":" + ss;
        var data = {
          acno: ac,
          amount: amt,
          day: today,
          t: time,
          ds: "Deposit",
        };

        // Store the transaction in mytran
        await axios.post("http://localhost:3000/mytran", data);

        setMsg(
          `${amt} Amount Deposited to your account. Your current balance is ${camt}`
        );
        setAc("");
        setPin("");
        setAmt("");
      } else {
        setMsg("Invalid account or PIN");
      }
    } catch (error) {
      console.log("Error depositing amount:", error);
      setMsg("Error depositing amount. Please try again.");
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
          <h1 style={{ color: "#212529", margin: "40px 0" }}>Deposit Amount</h1>
        </center>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="mb-3">
            <label
              htmlFor="accountNumber"
              className="form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Account Number
            </label>
            <input
              type="text"
              className="form-control"
              id="accountNumber"
              placeholder="Enter Account Number"
              style={{ borderRadius: "20px", border: "none" }}
              onInput={(e) => setAc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="pinNumber"
              className="form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              PIN
            </label>
            <input
              type="password"
              className="form-control"
              id="pinNumber"
              placeholder="Enter PIN"
              style={{ borderRadius: "20px", border: "none" }}
              onInput={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="depositAmount"
              className="form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Amount to Deposit
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                id="depositAmount"
                placeholder="Enter Amount"
                style={{ borderRadius: "20px", border: "none" }}
                onInput={(e) => setAmt(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-success"
              style={{ borderRadius: "20px" }}
              onClick={() => Addmoney()}
            >
              Deposit
            </button>
          </div>
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

export default Deposit;
