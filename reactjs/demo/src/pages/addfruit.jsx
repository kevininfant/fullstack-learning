import React, { useState, useContext } from "react";
import { FruitsContext } from "./hooks/useContext";

export default function AddFruit() {
  const [input, setInput] = useState("");
  const { addFruit } = useContext(FruitsContext);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter fruit"
      />
      <button
        onClick={() => {
          if (input.trim()) {
            addFruit(input);
            setInput("");
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
