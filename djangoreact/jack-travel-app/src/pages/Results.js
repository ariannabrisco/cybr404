import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { results, searchQuery } = location.state || {}; // Destructure the state

  console.log('Results:', results);
  console.log('Search Query:', searchQuery);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
      {results && results.length > 0 ? (
        <ul>
          {results.map((place) => (
            <li key={place.place_id}>
              <h2>{place.name}</h2>
              <p>{place.formatted_address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Results;
