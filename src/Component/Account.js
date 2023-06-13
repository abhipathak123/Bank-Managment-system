import React, { useState } from "react";
import axios from "axios";

function Account() {
  var [pin, setPin] = useState();
  var [name, setName] = useState();
  var [fname, setFname] = useState();
  var [email, setEmail] = useState();
  var [phone, setPhone] = useState();
  var [gender, setGender] = useState();
  var [country, setCountry] = useState();
  var [state, setState] = useState();
  var [city, setCity] = useState();
  var [amount, setAmount] = useState();

  var [msg, setMsg] = useState();

  var addData = async () => {
    var res = await axios.get("http://localhost:3000/account");

    var ac = "SBI";
    var x = res.data.length;
    if (x > 0) {
      x = x + 101;
      ac = ac + x;
    } else ac = "SBI101";

    var data = {
      acno: ac,
      pin: pin,
      name: name,
      fanme: fname,
      email: email,
      phone: phone,
      gender: gender,
      country: country,
      state: state,
      city: city,
      amount: amount,
    };
    res = await axios.post("http://localhost:3000/account", data);
    setMsg("Acount Opend Successfully with account Number " + ac);
  };

  return (
    <div
      className="container"
      style={{
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 20,

        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Pin
              <input
                type="text"
                className="form-control"
                onInput={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Name
              <input
                type="text"
                className="form-control"
                onInput={(e) => setName(e.target.value)}
              />
            </div>
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter FName
              <input
                type="text"
                className="form-control"
                onInput={(e) => setFname(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Email
              <input
                type="text"
                className="form-control"
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Phone
              <input
                type="text"
                className="form-control"
                onInput={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Gender
              <input
                type="text"
                className="form-control"
                onInput={(e) => setGender(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Coutry
              <input
                type="text"
                className="form-control"
                onInput={(e) => setCountry(e.target.value)}
              />
            </div>
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter State
              <input
                type="text"
                className="form-control"
                onInput={(e) => setState(e.target.value)}
              />
            </div>
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter City
              <input
                type="text"
                className="form-control"
                onInput={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ color: "#212529", fontWeight: "bold" }}
            >
              Enter Amount
              <input
                type="text"
                className="form-control"
                onInput={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <br />
          <br />
          <button className="btn btn-success" onClick={() => addData()}>
            Create Account
          </button>
          <br />
          <br />
          <h3> {msg}</h3>
        </div>
      </div>
    </div>
  );
}

export default Account;
