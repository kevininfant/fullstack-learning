import React, { useState, useEffect, useRef } from "react";

function TableData() {
  const [tableData, setTableData] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchData, setSearchData] = useState("");
  const debounceRef = useRef(null);

  const fetchData = async (pages, search = "") => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${pages}&_limit=10`
      );
      const data = await response.json();

      if (search.trim()) {
        const flitered = data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setTableData(filtered);
      } else {
        setTableData(data);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchData(pages, searchData);
  }, [pages]);

  const handlePrev = () => {
    if (pages > 0) setPages((prev) => prev - 1);
  };

  const handleNext = () => {
    setPages((prev) => prev + 1);
  };

  const searchField = (e) => {
    const value = e.target.value;
    setSearchData(value);

  
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchData(pages, value);
    }, 2000); 
  };

  return (
    <div align="center">
      <h1>Post Table</h1>
      <input
        type="text"
        placeholder="Search by title..."
        style={{ padding: "7px", margin: "15px" }}
        onChange={searchField}
      />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id}>
              <td>{data.userId}</td>
              <td>{data.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button onClick={handlePrev} disabled={pages === 0}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default TableData;
