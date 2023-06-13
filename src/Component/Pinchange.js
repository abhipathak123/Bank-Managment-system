import React, { useState } from "react";
import axios from "axios";

function Pinchange() {
  const [ac, setAc] = useState("");
  const [pin, setPin] = useState("");
  const [npin, setNpin] = useState("");
  const [cnfNpin, setCnfNpin] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handlePinChange = async () => {
    setShowMsg(false); // Reset showMsg to hide the message box

    try {
      const response = await axios.get("http://localhost:3000/account");
      const dt = response.data.filter(
        (item) => item.acno === ac && item.pin === pin
      );

      if (dt.length > 0) {
        console.log("Account verified");
        const id = dt[0].id;
        if (!(pin === npin)) {
          if (npin === cnfNpin) {
            const updatedAccount = {
              ...dt[0],
              pin: npin,
            };

            const updateResponse = await axios.put(
              `http://localhost:3000/account/${id}`,
              updatedAccount
            );

            console.log("Pin changed successfully");
            setMsg("Pin changed successfully");
          } else {
            setMsg("Pin did not match");
          }
        } else setMsg("New Pin and old pin cant be same");
      } else {
        setMsg("Invalid account number or pin");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMsg("Error occurred while changing the pin");
    }

    setShowMsg(true); // Show the message box after submitting
  };

  const handleDismiss = () => {
    setShowMsg(false); // Hide the message box
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <center>
          <h1>Pin Change Page</h1>
        </center>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row mb-3">
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
                value={ac}
                onChange={(e) => setAc(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="colFormLabel"
              className="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Old Pin
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="colFormLabel"
                placeholder="Old Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="colFormLabel"
              className="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter New Pin
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="colFormLabel"
                placeholder="New Pin"
                value={npin}
                onChange={(e) => setNpin(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="colFormLabel"
              className="col-sm-4 col-form-label"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Confirm New Pin
            </label>

            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="colFormLabel"
                placeholder="Confirm New Pin"
                value={cnfNpin}
                onChange={(e) => setCnfNpin(e.target.value)}
              />
            </div>
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
          <div className="row mb-3">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handlePinChange}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default Pinchange;
