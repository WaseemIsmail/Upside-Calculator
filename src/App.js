import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CFALogo from "./assets/CFA.png";
import WindForceLogo from "./assets/WindForce.png";
import videoBackground from "./assets/background.mp4";

// Hardcoded intrinsic value
const intrinsicValue = 25.96;

function calculateResults(currentPrice, investmentAmount) {
  const currentPriceFloat = parseFloat(currentPrice);
  const investmentAmountFloat = parseFloat(investmentAmount);

  // Calculate upside percentage and investment return
  const upsidePercentage = ((intrinsicValue - currentPriceFloat) / currentPriceFloat) * 100;
  const investmentReturn = investmentAmountFloat * (upsidePercentage / 100);

  return {
    intrinsicValue,
    currentPrice: currentPriceFloat,
    investmentAmount: investmentAmountFloat,
    upsidePercentage: upsidePercentage.toFixed(2),
    investmentReturn: investmentReturn.toFixed(2),
  };
}

function Home() {
  const [formData, setFormData] = useState({
    currentPrice: "",
    investmentAmount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPrice, investmentAmount } = formData;

    // Validation check for empty fields
    if (!currentPrice || !investmentAmount) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Calculate results based on inputs
    const results = calculateResults(parseFloat(currentPrice), parseFloat(investmentAmount));

    // Redirect to results page with URL-encoded data
    const encodedResults = encodeURIComponent(JSON.stringify(results));
    window.location.href = `/results?data=${encodedResults}`;
  };

  return (
    <div className="app-container">
      <video autoPlay muted loop className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header>
        <div className="logo">
          <img src={CFALogo} alt="CFA Society Sri Lanka" />
        </div>
        <div className="logo">
          <img src={WindForceLogo} alt="WindForce Logo" />
        </div>
      </header>

      <div className="form-container">
        <h2>Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Current Price:
            <input
              type="number"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Investment Amount:
            <input
              type="number"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Calculate</button>
        </form>
      </div>
    </div>
  );
}

function Results() {
  const queryParams = new URLSearchParams(window.location.search);
  const encodedData = queryParams.get("data");

  // If no data is found in query string
  if (!encodedData) {
    return <div>Error: No data provided.</div>;
  }

  // Decode and parse the results data
  const result = JSON.parse(decodeURIComponent(encodedData));

  return (
    <div className="app-container">
      <video autoPlay muted loop className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="result-container">
        <div className="cards-row">
          <div className="result-card">
            <h2>Upside Calculation</h2>
            <p>Intrinsic Value: Rs.{result.intrinsicValue}</p>
            <p>Current Price: Rs.{result.currentPrice}</p>
            <p>
              <span className="bold">Upside: {result.upsidePercentage}%</span>
            </p>
          </div>
          <div className="result-card">
            <h2>Return Calculation</h2>
            <p>Investment: Rs.{result.investmentAmount}</p>
            <p>
              <span className="bold">Total Return: Rs. {result.investmentReturn}</span>
            </p>
          </div>
        </div>
        <button className="go-back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
