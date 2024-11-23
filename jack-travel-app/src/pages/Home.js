import React, { useState } from "react";
import AccessibilitySidebar from "../components/AccessibilitySidebar";


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

  // Favorite Functionality
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (place) => {
    setFavorites((prev) =>
      prev.includes(place)
        ? prev.filter((fav) => fav !== place) // Remove from favorites
        : [...prev, place] // Add to favorites
    );
  };

  // Sidebar Functionality
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => alert("Food button clicked!")}
        >
          🍜 Food
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#74c69d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Events button clicked!")}
        >
          🎟️ Events
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
         🛍️ Places
        </button>
      </div>

      {/* Search Bar and Buttons Section */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          aria-label="Search here"
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

      {/* Hot List Section */}
      <div style={{ marginTop: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🔥 Hot List 🔥</h2>
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"].map(
          (place, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => alert(`${place} clicked!`)}
            >
              <img
                src={`https://via.placeholder.com/40?text=${index + 1}`}
                alt=""
                style={{ marginRight: "10px", borderRadius: "50%" }}
              />
              <span style={{ fontSize: "16px", flex: 1 }}>{place}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(place);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: favorites.includes(place) ? "red" : "gray",
                }}
              >
                {favorites.includes(place) ? "💞" : "🤍"}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
    </div>
  );
};

export default Home;
