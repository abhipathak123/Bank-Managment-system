import axios from "axios";
import React, { useState } from "react";

function Withdraw() {
  var [ac, setAc] = useState("");
  var [pin, setPin] = useState("");
  var [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  var getWithdraw = async () => {
    setShowMsg(false);
    var res = await axios.get("http://localhost:3000/account");
    var dt = res.data.filter((item) => item.acno == ac && item.pin == pin);
    if (dt.length > 0) {
      console.log("Account verify");
      var camt = parseInt(dt[0].amount);
      var id = dt[0].id;
      if (camt >= parseInt(amt)) {
        console.log("Ready to withdarw");
        camt = camt - parseInt(amt);
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
          ds: "Withdrawl",
        };

        // Store the transaction in mytran
        await axios.post("http://localhost:3000/mytran", data);
        res = await axios.put(`http://localhost:3000/account/${id}`, dt1);
        setMsg("After Withdraw " + amt + " Your Current balacne is =" + camt);
      } else setMsg("Insufficienct blaance");
    } else setMsg("Invalid account or Pin");
    setShowMsg(true);
  };
  const handleDismiss = () => {
    setShowMsg(false); // Hide the message box
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="">
            <div className="card-body p-5">
              <h1 className="font-weight-light text-center mb-5">
                Withdraw Amount Page
              </h1>
              <div className="form-group row mb-3">
                <label
                  className="col-sm-4 col-form-label"
                  style={{ color: "#212529", fontWeight: "bold" }}
                >
                  Enter Account Number
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account Number"
                    onInput={(e) => setAc(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-sm-4 col-form-label"
                  style={{ color: "#212529", fontWeight: "bold" }}
                >
                  Enter Pin
                </label>
                <div className="col-sm-8">
                  <input
                    placeholder="Enter Pin"
                    type="number"
                    className="form-control"
                    onInput={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row mb-5">
                <label
                  htmlFor="withdrawAmount"
                  className="col-sm-4 col-form-label"
                  style={{ color: "#212529", fontWeight: "bold" }}
                >
                  Amount to Withdraw
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    id="withdrawAmount"
                    placeholder="Withdraw Amount"
                    onInput={(e) => setAmt(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-5 py-3"
                  onClick={() => getWithdraw()}
                >
                  Withdraw
                </button>
              </div>
              <div className="row">
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
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default Withdraw;
