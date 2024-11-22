import React, { useState } from "react";

const Home = () => {
  // Search Functionality
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!");
      return;
    }
    alert(`You searched for ${searchQuery}`);
  };
  
  // Return (Display)
  return (
    // Container for Everything
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>JACK's Travel</h1>
      </header>

      {/* Row of Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#ffa500",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Food button clicked!")}
        >
          Food
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Events button clicked!")}
        >
          Events
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#ffc107",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Places button clicked!")}
        >
          Places
        </button>
      </div>

      {/* Search Bar and Buttons Section */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search state
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#ff69b4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
