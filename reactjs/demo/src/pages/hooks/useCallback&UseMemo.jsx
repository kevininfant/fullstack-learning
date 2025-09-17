import React, { useState, useMemo, useCallback } from "react";

function UsersExample() {
  const [search, setSearch] = useState("");
  const [users] = useState([
    "Kevin",
    "Karthick",
    "Pradeep",
    "Arun",
    "Rahman",
    "Dhanush",
  ]);

  // useCallback → memoizes the function
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // useMemo → memoizes the filtered list (value)
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return users.filter((user) =>
      user.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={handleSearchChange} // ✅ using useCallback
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersExample;
