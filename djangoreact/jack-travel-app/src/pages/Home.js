import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
          autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current
          );
          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
              console.log("Selected place:", place);
              setSearchResults([place]);
            }
          });
        }
      };
      document.head.appendChild(script);
    };
    loadGoogleMapsScript();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>JACK's Travel</h1>
      </header>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Search for ..."
          ref={inputRef}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Search Results</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {searchResults.map((place, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fffaf0",
              }}
            >
              <span>{place.name || "Unnamed Place"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
