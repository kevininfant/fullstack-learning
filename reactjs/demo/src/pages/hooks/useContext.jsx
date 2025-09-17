import React, { createContext, useState } from "react";

// Create Context
export const FruitsContext = createContext();

// Create Store Provider
export function FruitsProvider({ children }) {
  const [fruits, setFruits] = useState(["Apple", "Banana", "Mango"]);

  // Add new fruit
  const addFruit = (fruit) => {
    setFruits([...fruits, fruit]);
  };

  // Remove fruit
  const removeFruit = (fruit) => {
    setFruits(fruits.filter((f) => f !== fruit));
  };

  return (
    <FruitsContext.Provider value={{ fruits, addFruit, removeFruit }}>
      {children}
    </FruitsContext.Provider>
  );
}
