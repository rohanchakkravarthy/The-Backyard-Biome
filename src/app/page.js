"use client";
import { useState } from "react";
import feederData from "./birdData/birdfeederdata.json";

const regions = [
  {
    id: "Northeast",
    label: "Northeast",
    color: "#D6E8F0",
    borderColor: "#5A9AB5",
    textColor: "#1a4a5e",
    states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"],
  },
  {
    id: "Southeast",
    label: "Southeast",
    color: "#D6EDD6",
    borderColor: "#5A9A55",
    textColor: "#1a4e5e",
    states: ["Alabama", "Arkansas", "Florida", "Georgia", "Kentucky", "Louisiana", "Mississippi", "North Carolina", "South Carolina", "Tennessee", "Virginia", "West Virginia"],
  },
  {
    id: "Midwest",
    label: "Midwest",
    color: "#F0E8D6",
    borderColor: "#B5955A",
    textColor: "#5e3a1a",
    states: ["Illinois", "Indiana", "Iowa", "Michigan", "Minnesota", "Missouri", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"],
  },
  {
    id: "Southwest",
    label: "Southwest",
    color: "#F0DDD6",
    borderColor: "#B5715A",
    textColor: "#5e2a1a",
    states: ["Arizona", "Colorado", "Nevada", "New Mexico", "Oklahoma", "Texas", "Utah"],
  },
  {
    id: "West",
    label: "West",
    color: "#E8D6F0",
    borderColor: "#8A5AB5",
    textColor: "#3a1a5e",
    states: ["Alaska", "California", "Hawaii", "Idaho", "Montana", "Oregon", "Washington", "Wyoming"],
  },
];


export default function Home() {
  const [chosenRegion, setChosenRegion] = useState("");
  const [chosenState, setChosenState] = useState("");

  const region = regions.find((r) => r.id === chosenRegion);
  const stateData = chosenState ? feederData[chosenState] : null;

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "8px" }}>The Backyard Biome</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "32px" }}>
       Find The Best Bird Feeders & Bird Foods For Birds In Your Region!
       </p>
{/*Buttons for regions*/}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setChosenRegion(r.id);
              setChosenState("");
            }}
            style={{
              backgroundColor: r.color,
              border: `2px solid ${chosenRegion === r.id ? r.borderColor : "transparent"}`,
              color: r.textColor,
              padding: "12px 22px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: chosenRegion === r.id ? "600" : "400",
              fontSize: "15px",
              boxShadow: chosenRegion === r.id ? `0 2px 8px ${r.borderColor}55` : "none",
              transition: "all 0.2s ease",
            }}
          >
            {r.label}
          </button>
        ))}
      </div>
      {/*State picking*/}
      {region && (
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <label style={{ fontWeight: "500", marginRight: "10px", color: region.textColor }}>
            Choose your state:
          </label>
          <select
            value={chosenState}
            onChange={(e) => setChosenState(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: `1.5px solid ${region.borderColor}`,
              backgroundColor: region.color,
              color: region.textColor,
              fontSize: "14px",
              cursor:  "pointer",
            }}
          >
            <option value="">-- Pick a state --</option>
            {region.states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}

      {/*confirmation*/}
      {stateData && (
        <div style={{ backgroundColor: region.color, borderRadius: "16px", padding: "28px", border: `1.5px solid ${region.borderColor}` }}>
          <h2 style={{ color: region.textColor, marginBottom: "20px", textAlign: "center"}}>
            {chosenState} Recommendations
          </h2>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>  

            {/*Bird data*/}
            <div style={{ flex: "1", minWidth: "200px", backgroundColor: "white", borderRadius: "12px", padding: "16px" }}>
              <h3 style={{ color: region.textColor, marginBottom: "12px" }}>Common Birds</h3>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {stateData.birds.map((bird) => (
                  <li key={bird} style={{ marginBottom: "6px", }}>{bird}</li>
                ))}
              </ul>
            </div>  
            {/*Feeder Data*/}
            <div style={{ flex: "1", minWidth: "200px", backgroundColor: "white", borderRadius: "12px", padding: "16px" }}>
              <h3 style={{ color: region.textColor, marginBottom: "12px" }}>Best Feeders</h3>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {stateData.feeders.map((feeder) => (
                  <li key={feeder} style={{ marginBottom: "6px" }}>{feeder}</li>
                ))}
              </ul>
            </div>

            {/* Foods */}
            <div style={{ flex: "1", minWidth: "200px", backgroundColor: "white", borderRadius: "12px", padding: "16px" }}>
              <h3 style={{ color: region.textColor, marginBottom: "12px" }}>Best Foods</h3>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {stateData.foods.map((food) => (
                  <li key={food} style={{ marginBottom: "6px" }}>{food}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}

