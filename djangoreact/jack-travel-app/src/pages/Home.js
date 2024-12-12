/* global google */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search query
  const [searchResults, setSearchResults] = useState([]); // Stores dynamic search results
  const [favoritesList, setFavoritesList] = useState([]); // Stores user's favorite places
  const inputRef = useRef(null); // Reference to the input field
  const autocompleteRef = useRef(null); // Reference to the Google Places Autocomplete

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAiBq6u-VFO7w4iIdesKOHKYN7GGmLhN4&libraries=places`; // Use environment variables for API key
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
              setSearchResults([place]); // Set the selected place as the only result
              setSearchQuery(place.formatted_address); // Set the full formatted address
            }
          });
        }
      };
      document.head.appendChild(script);
    };
    loadGoogleMapsScript();
  }, []);

  // Fetch places based on the search query dynamically
  const handleSearch = async (query) => {
  if (!query.trim()) {
    setSearchResults([]); // Clear results if query is empty
    return;
  }

  const service = new google.maps.places.PlacesService(document.createElement("div"));
  const request = {
    query: query,
    fields: ["formatted_address", "geometry", "name", "place_id", "photos"],
  };

  service.textSearch(request, (results, status) => {
    console.log("Search query:", query);  // Log the query
    console.log("API results:", results); // Log the results

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      if (results && results.length > 0) {
        setSearchResults(results); // Set search results if found
      } else {
        console.log("No results found for query:", query);  // Debugging log
        setSearchResults([]); // Set an empty array if no results found
      }
    } else {
      console.error("Error fetching places:", status);
    }
  });
};

  // Update the search query and fetch results as the user types
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Fetch search results as user types
  };

  // Handle form submission (not implemented in this version)
  const executeSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!");
      return;
    }
    alert(`You searched for ${searchQuery}`);
  };

  // Toggle a place in the favorites list
  const toggleFavorite = (place) => {
    setFavoritesList((prev) =>
      prev.includes(place)
        ? prev.filter((fav) => fav !== place)
        : [...prev, place]
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => alert("Food button clicked!")}
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
          onClick={() => alert("Events button clicked!")}
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
          onClick={() => alert("Places button clicked!")}
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
          onChange={handleInputChange} // Trigger search dynamically
          style={{
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={executeSearch}
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

      {/* Display Dynamic Search Results */}
      {searchResults.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>🔍 Search Results 🔍</h2>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {searchResults.map((place) => (
              <li
                key={place.place_id} // Ensure key is unique
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
                  src={place.photos ? place.photos[0].getUrl({ maxWidth: 40, maxHeight: 40 }) : "https://via.placeholder.com/40"}
                  alt=""
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
                <span style={{ fontSize: "16px", flex: 1 }}>{place.name}</span>
                <Link
                  to={{
                    pathname: "/results",
                    state: { results: [place], searchQuery: searchQuery },
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "blue",
                  }}
                >
                  View Details
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick for the list item
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
            ))}
          </ul>
        </div>
      )}

      {/* Hot List Section */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>🔥 Hot List 🔥</h2>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          {["Cunningham's Journal", "Axe Holes", "Kearney Community Theater", "The Lodge", "Candy Cane Parade"].map(
            (place) => (
              <li
                key={place} // Use place name as key
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
                  src={`https://via.placeholder.com/40?text=${place}`}
                  alt=""
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
                <span style={{ fontSize: "16px", flex: 1 }}>{place}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick for the list item
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
