"use client";
import { useState } from "react";

export default function Home() {
  const [chosenRegion, setChosenRegion] = useState("");
  const [results, setResults] = useState(null);

  
  return (
    <main>
      <h1>The Backyard Biome</h1>
      <p> Find The Best Bird Feeders & Bird Foods For Birds In Your Region!</p>
    </main>
  );
}