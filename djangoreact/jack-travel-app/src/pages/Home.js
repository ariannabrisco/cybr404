/* global google */
import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAiBq6u-VFO7w4iIdesKOHKYN7GGmLhN4&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded!");
        if (inputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current);
          autocompleteRef.current.setFields(["address_components", "geometry", "formatted_address"]);

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
              setSearchResults([place]);
              setSearchQuery(place.formatted_address); // Set the full formatted address
            }
          });
        }
      };
      document.head.appendChild(script);
    };
    loadGoogleMapsScript();
  }, []);

  const executeSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!");
      return;
    }
    alert(`You searched for ${searchQuery}`);
  };

  const toggleFavorite = (place) => {
    setFavoritesList((prev) =>
      prev.includes(place)
        ? prev.filter((fav) => fav !== place) // Remove from favorites
        : [...prev, place] // Add to favorites
    );
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>JACK's Travel</h1>
      </header>

      {/* Row of Category Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#630FFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => alert("Food button clicked!")} // Placeholder for Food API
        >
          🍜 Food
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#0071EB",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Events button clicked!")} // Placeholder for Events API
        >
          🎟️ Events
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#35825C",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Places button clicked!")} // Placeholder for Places API
        >
          🛍️ Places
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <input
          ref={inputRef} // Attach ref to the input
          type="text"
          placeholder="Search for ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Allow typing
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={executeSearch}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#DB006E",
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
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>🔥 Hot List 🔥</h2>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          {["Cunningham's Journal", "Axe Holes", "Kearney Community Theater", "The Lodge", "Candy Cane Parade"].map(
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
                  backgroundColor: "#fffaf0",
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
                    color: favoritesList.includes(place) ? "red" : "gray",
                  }}
                >
                  {favoritesList.includes(place) ? "💞" : "🤍"}
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
