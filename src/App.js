import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Component/Nav";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Accountsummary from "./Component/Accountsummary";
import Withdrawl from "./Component/Withdrawl";
import Balanceinquiry from "./Component/Balanceinquiry";
import Account from "./Component/Account";
import Fundtransfer from "./Component/Fundtransfer";
import Deposit from "./Component/Deposit";
import Pinchange from "./Component/Pinchange";
import Summary from "./Component/Summary";

function App() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right top, #12e9e5, #5eeae5, #82eae5, #9febe5, #b7ebe6)",
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accsum" element={<Accountsummary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/with" element={<Withdrawl />} />
          <Route path="/balinq" element={<Balanceinquiry />} />
          <Route path="/acc" element={<Account />} />
          <Route path="/fundtra" element={<Fundtransfer />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/pinchange" element={<Pinchange />} />
          <Route path="/show" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
