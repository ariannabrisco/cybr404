import React, { useState } from "react";


const Home = () => {
  // Search Functionality
  const [searchQuery, setSearchQuery] = useState("");

  const executeSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query!");
      return;
    }
    alert(`You searched for ${searchQuery}`);
  };

  // *** PLACEHOLDER *** Favorite Functionality simple state change
  const [favoritesList, setFavoritesList] = useState([]);

  const Favorite = (place) => {
    setFavoritesList((prev) =>
      prev.includes(place)
        ? prev.filter((fav) => fav !== place) // Remove from favoritesList
        : [...prev, place] // Add to favoritesList
    );
  };
  
  // Return (Display)
  return (
    // Container for Everything
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>JACK'sss Travel</h1>
      </header>

      {/* Row of Category Buttons */}
      <div 
      style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginTop: "30px" 
        }}
        >
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
            justifyContent: "center"
          }}
          onClick={() => alert("Food button clicked!")}           // *** PLACEHOLDER API CALL WILL SHOW RESULTS ***
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
          onClick={() => alert("Events button clicked!")}           // *** PLACEHOLDER API CALL WILL SHOW RESULTS ***
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
          onClick={() => alert("Places button clicked!")}           // *** PLACEHOLDER API CALL WILL SHOW RESULTS ***
        >
         🛍️ Places
        </button>
      </div>

      {/* Search Bar and Button Section */}
      <div 
      style={{ 
        textAlign: "center", 
        marginTop: "30px" 
        }}
        >
        <input
          type="text"
          placeholder="Search for ..."
          value={searchQuery}
          aria-label="Enter search here"
          onChange={(e) => setSearchQuery(e.target.value)}
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
      <div 
      style={{ 
        marginTop: "20px" 
        }}
        >
      <h2 
      style={{ 
        fontSize: "28px", 
        marginBottom: "10px" 
        }}
        >🔥 Hot List 🔥</h2>
      <ul 
      style={{ 
        listStyleType: "none", 
        padding: "0", 
        margin: "0" 
        }}
        >
          {/* *** PLACEHOLDER TOP FIVE */}
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
              onClick={() => alert(`${place} clicked!`)}  // *** PLACEHOLDER API CALL WILL SHOW INFO ***
            >
              <img
                src={`https://via.placeholder.com/40?text=${index + 1}`} // *** MAYBE-PLACEHOLDER (literally) Free Gray Icon ***
                alt="" // No alt per WAVE tool for redundancy
                style={{ 
                  marginRight: "10px", 
                  borderRadius: "50%" 
                }}
              />
              <span 
              style={{ 
                fontSize: "16px", 
                flex: 1 
                }}
                >{place}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  Favorite(place);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: favoritesList.includes(place) ? "red" : "gray",
                }}
              >
                {/* Pink Heart = Favorite, White Heart = Not Favorite*/}
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
