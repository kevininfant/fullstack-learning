import React, { useContext } from "react";
import { FruitsContext } from "./hooks/useContext";

export default function FruitList() {
  const { fruits, removeFruit } = useContext(FruitsContext);

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>
          {fruit} <button onClick={() => removeFruit(fruit)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
