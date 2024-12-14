/* global google */
import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  // States for storing search query, search results, and favorite places
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  // Refs for managing the input and autocomplete functionality
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // This effect will load the Google Maps script when the component mounts
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAiBq6u-VFO7w4iIdesKOHKYN7GGmLhN4&libraries=places`; // Google Maps API URL
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded!");

        // Initialize the autocomplete service once the script is loaded
        if (inputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current);
          autocompleteRef.current.setFields(["name", "address_components", "geometry", "formatted_address"]);

          // Listener for when a place is selected in the autocomplete dropdown
          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
              // Set the search query based on the selected place (name or address)
              setSearchQuery(place.name || place.formatted_address || "Unnamed Place");
            }
          });
        }
      };
      document.head.appendChild(script); // Append the script to the document's head to load it
    };
    loadGoogleMapsScript(); // Call the function to load the script
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const executeSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!"); // Alert if the search query is empty
      return;
    }

    // Create a new PlacesService to query Google Places API
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const request = {
      query: searchQuery, // Search query from the user input
      fields: ["formatted_address", "geometry", "name", "place_id", "photos"], // Fields we need from the API
    };

    // Perform the search request using the Google Places API
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // If the search is successful, update the search results with data
        setSearchResults(results.map((place) => ({
          id: place.place_id,
          name: place.name || "Unnamed Place",
          address: place.formatted_address || "No address available",
          photoUrl: place.photos && place.photos[0] ? place.photos[0].getUrl({ maxWidth: 40, maxHeight: 40 }) : "https://via.placeholder.com/40",
        })));
      } else {
        console.error("Error fetching places:", status); // Log error if API request fails
      }
    });
  };

  const toggleFavorite = (placeId) => {
    // Toggle a place between favorites list
    setFavoritesList((prev) =>
      prev.includes(placeId)
        ? prev.filter((fav) => fav !== placeId) // Remove from favorites if already there
        : [...prev, placeId] // Add to favorites if not already in the list
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
            fontSize: "18px",
            borderRadius: "5px",
            backgroundColor: "#630FFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Food button clicked!")} // Placeholder for Food API
        >
          🍜 Food
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "18px",
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
            fontSize: "18px",
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
          ref={inputRef} // Attach ref to the input for the autocomplete functionality
          type="text"
          placeholder="Search for ..."
          value={searchQuery} // Bind the search query state to the input value
          aria-label="Search bar entry" // Accessibility label
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state on user input
          style={{
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={executeSearch} // Trigger the search when the button is clicked
          style={{
            padding: "10px 20px",
            fontSize: "18px",
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>🔍 Search Results 🔍</h2>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {searchResults.map((place) => (
              <li
                key={place.id} // Ensure each item has a unique key
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
              >
                <img
                  src={place.photoUrl} // Display place photo or placeholder
                  alt={place.name || "No image available"}
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "16px", display: "block", fontWeight: "bold" }}>
                    {place.name}
                  </span>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {place.address}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(place.id)} // Toggle favorite when clicked
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: favoritesList.includes(place.id) ? "red" : "gray",
                  }}
                >
                  {favoritesList.includes(place.id) ? "💞" : "🖤"} {/* Show heart or empty heart */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
