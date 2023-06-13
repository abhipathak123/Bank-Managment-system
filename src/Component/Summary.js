import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Summary() {
  const location = useLocation();
  const { accountData, mytranData } = location.state;
  var navigate = useNavigate();
  var nav = async () => {
    navigate("/accsum");
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <center>
          <h1>Summary Page</h1>
        </center>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3>Account Details</h3>
          {accountData.length > 0 ? (
            <table className="table table-dark table-hover table-striped">
              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Pin</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {accountData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.acno}</td>
                    <td>{item.pin}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No account details found.</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3>Transaction Details</h3>
          {mytranData.length > 0 ? (
            <table className="table table-dark table-hover table-striped">
              <thead>
                <tr>
                  <th>Descreption</th>
                  <th>Amount</th>
                  <th>date</th>
                  <th>time</th>
                </tr>
              </thead>
              <tbody>
                {mytranData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ds}</td>
                    <td>{item.amount}</td>
                    <td>{item.day}</td>
                    <td>{item.t}</td>
                    {/* Add more columns as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transaction details found.</p>
          )}
        </div>
      </div>
      <div className="col-12">
        <center>
          {" "}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => nav()}
          >
            Get Summary
          </button>
        </center>
      </div>
    </div>
  );
}

export default Summary;
