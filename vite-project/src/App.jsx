import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Stores the user's input
  const [areaData, setAreaData] = useState(null); // Stores the fetched area data
  const [error, setError] = useState(null); // Stores error messages

  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter an area name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/search/${searchQuery}`);
      if (!response.ok) {
        throw new Error("Area or Neighbor not found.");
      }
      const data = await response.json();
      setAreaData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setAreaData(null); // Clear previous results
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
      <h1>Area Search</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Enter area name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            flex: 1,
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {areaData && (
        <div style={{ marginTop: "20px", textAlign: "left", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h2>Area Details</h2>
          {areaData.area.areaName.toLowerCase() === searchQuery.toLowerCase() ? (
            <>
              <p><strong>Area Name:</strong> {areaData.area.areaName}</p>
              <p><strong>Cross Check Area:</strong> {areaData.area.crossCheckArea}</p>
              <p><strong>Status:</strong> {areaData.area.status}</p>
              <p><strong>Cross Check Names:</strong> {areaData.area.crossCheckNames.join(", ")}</p>
              <p><strong>Responsibility:</strong> {areaData.area.responsibility.join(", ")}</p>
            </>
          ) : (
            <>
              <p><strong>Neighboring Area Name:</strong> {searchQuery.toUpperCase()}</p>
              <p><strong>Main Area:</strong> {areaData.area.areaName}</p>
              <p><strong>Cross Check Area:</strong> {areaData.area.crossCheckArea}</p>
              <p><strong>Status:</strong> {areaData.area.status}</p>
              <p><strong>Cross Check Names:</strong> {areaData.area.crossCheckNames.join(", ")}</p>
              <p><strong>Responsibility:</strong> {areaData.area.responsibility.join(", ")}</p>
            </>
          )}

          <h3>Neighboring Areas:</h3>
          <ul>
            {areaData.neighbors.map((neighbor, index) => (
              <li key={index}>{neighbor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App
