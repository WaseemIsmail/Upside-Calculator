import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CFALogo from "./assets/CFA.png";
import WindForceLogo from "./assets/WindForce.png";
import videoBackground from "./assets/background.mp4";
import ProjectVideo from "./assets/project_video.mp4"
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Hardcoded intrinsic value
const intrinsicValue = 27.8;

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
  const navigate = useNavigate(); // Initialize navigate

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


  // State to track which button's dropdown is open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle a specific dropdown
  const toggleDropdown = (dropdownId) => {
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
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
        <h2  className="bold">Enter Details</h2>
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
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none"
          >
          Calculate
          </button>

        </form>
      </div>

      <div className="min-h-screen flex items-center justify-center ">
      {/* Buttons Row */}
      <div className="flex space-x-4">
        {/* Dropdown 1 */}
        <div className="relative">
          <button
            className="w-40 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => toggleDropdown("dropdown1")}
          >
            Financial Statement
          </button>
          {activeDropdown === "dropdown1" && (
            <div className="absolute mt-1 w-40 bg-gray-100 border border-gray-300 rounded shadow-lg">
              <button  onClick={() => window.open("https://drive.google.com/file/d/1JHhs_q15CoqwYXy53pBQ_eFhBZcuaCiL/view?usp=sharing", "_blank")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                FY 24
              </button>
              <button onClick={() => window.open("https://drive.google.com/file/d/1jMsAv3ob1O7Tfr_dw6fOdsSU143DgqHA/view?usp=sharing", "_blank")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                FY 23
              </button>
              <button onClick={() => window.open("https://drive.google.com/file/d/1yf6j9opzKg5aIOOXsocwJ5EBOs6V8LCW/view?usp=sharing", "_blank")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                FY 22
              </button>
              <button onClick={() => window.open("https://drive.google.com/file/d/1IQH6-ryBpSBQcypRHmaTLzhhJbF-lDO2/view?usp=sharing", "_blank")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                FY 21
              </button>
            </div>
          )}
        </div>

        {/* Dropdown 2
        <div className="relative">
          <button
            className="w-40 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => toggleDropdown("dropdown2")}
          >
            Research <br/>Report
          </button>
          {activeDropdown === "dropdown2" && (
            <div className="absolute mt-1 w-40 bg-gray-100 border border-gray-300 rounded shadow-lg">
              <button onClick={() => window.open("", "_blank")}  className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                Last Updated On 13th of December 2024
              </button>
              
            </div>
          )}
        </div> */}

        {/* Dropdown 3 */}
        <div className="relative">
          <button
            className="w-40 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => toggleDropdown("dropdown3")}
          >
            Proposed Additions 
          </button>
          {activeDropdown === "dropdown3" && (
            <div className="absolute mt-1 w-40 bg-gray-100 border border-gray-300 rounded shadow-lg">
              <button onClick={() => navigate("/projectVideo")} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                Siyambalanduwa Project
              </button>
              
            </div>
          )}
        </div>
      </div>
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
            <p>Intrinsic Value: Rs.{result.intrinsicValue}<br/>(Updated On 13th December 2024)</p>
            <p>Current Price: Rs.{result.currentPrice}</p>
            <p>
              <span className="bold">Upside/Downside: {result.upsidePercentage}%</span>
            </p>
          </div>
          <div className="result-card">
            <h2>Return Calculation</h2>
            <p>Investment: Rs.{result.investmentAmount}</p>
            <p>
              <span className="bold">Total Return/Loss: Rs. {result.investmentReturn}</span>
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

function ProjectVideoPage() {

  return (
    <div className="app-container">
      <video autoPlay muted loop className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Container */}
      <div className="flex items-center justify-center  min-h-screen pt-20">
      <div className="w-1/2 h-1/2">
      <video
          autoPlay
          controls
          className="w-full h-full rounded-lg"
        >
          <source src={ProjectVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
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
        <Route path="/projectVideo" element={<ProjectVideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
