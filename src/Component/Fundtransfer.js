import axios from "axios";
import React, { useState } from "react";

function Fundtransfer() {
  var [ac, setAc] = useState("");
  var [pin, setPin] = useState("");
  var [amt, setAmt] = useState("");
  var [acn, setAcn] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  var transferAmount = async () => {
    setShowMsg(false);
    try {
      var res = await axios.get(
        `http://localhost:3000/account?acno=${ac}&pin=${pin}`
      );
      var dt = res.data;
      if (dt.length === 1) {
        console.log("Account verified");
        var fromAccount = dt[0];
        var camt = parseInt(fromAccount.amount);
        if (camt >= parseInt(amt)) {
          console.log("Ready to transfer");
          camt = camt - parseInt(amt);
          var dt1 = { ...fromAccount, amount: camt };
          var res = await axios.put(
            `http://localhost:3000/account/${fromAccount.id}`,
            dt1
          );
          if (res.status === 200) {
            var toAccountRes = await axios.get(
              `http://localhost:3000/account?acno=${acn}`
            );
            var toAccount = toAccountRes.data[0];
            if (toAccount) {
              console.log("Receiver Account Verified");
              var toAmt = parseInt(toAccount.amount) + parseInt(amt);
              var toAccountUpdated = { ...toAccount, amount: toAmt };
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
                ds: "Transfered",
              };

              // Store the transaction in mytran
              await axios.post("http://localhost:3000/mytran", data);
              res = await axios.post(`http://localhost:3000/mytran`, data);
              var data = {
                acno: acn,
                amount: amt,
                day: today,
                t: time,
                ds: "Recieved",
              };
              res = await axios.post(`http://localhost:3000/mytran`, data);
              var toRes = await axios.put(
                `http://localhost:3000/account/${toAccount.id}`,
                toAccountUpdated
              );
              if (toRes.status === 200) {
                setMsg(
                  `₹ ${amt} transferred successfully from account ${ac} to account ${acn}`
                );
              } else {
                setMsg("Error transferring amount");
              }
            } else {
              setMsg("Receiver Account not found");
            }
          } else {
            setMsg("Error transferring amount");
          }
        } else {
          setMsg("Insufficient balance");
        }
      } else {
        setMsg("Invalid account or Pin");
      }
    } catch (error) {
      setMsg("Error transferring amount");
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
          <h1> Fund Transfer Page</h1>
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
                onInput={(e) => setAc(e.target.value)}
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
                onInput={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="colFormLabel"
              class="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Amount to Transfer
            </label>
            <div class="col-md-10">
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Transfer Amount"
                  onInput={(e) => setAmt(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <label
              for="colFormLabel"
              class="col-sm-6 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Account to Transfer
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="colFormLabel"
                placeholder="Amount to transfer"
                onInput={(e) => setAcn(e.target.value)}
              />
            </div>
          </div>
          <div class="col-12">
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={() => transferAmount()}
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Transfer
            </button>
          </div>
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

export default Fundtransfer;
