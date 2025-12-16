import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg, #6e8efb, #a777e3)",
      }}
    >
      <div
        style={{
          width: "340px",
          padding: "30px",
          borderRadius: "15px",
          background: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Counter App</h1>

        <h2
          style={{
            fontSize: "40px",
            margin: 0,
            color: "#6e8efb",
            fontWeight: "bold",
          }}
        >
          {count}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "15px",
          }}
        >
          <button
            onClick={increment}
            style={{
              backgroundColor: "#28A745",
              color: "white",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Increment
          </button>

          <button
            onClick={decrement}
            style={{
              backgroundColor: "#DC3545",
              color: "white",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Decrement
          </button>

          <button
            onClick={reset}
            style={{
              backgroundColor: "#FFC107",
              color: "#333",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
