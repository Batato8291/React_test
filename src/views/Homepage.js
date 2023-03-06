import React, { useState } from "react";
import Search from "../components/Search";
import "../styles/all.css";

const Homepage = () => {
  const [input, setInput] = useState("");
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
  let [data, setData] = useState(null);
  const auth = "563492ad6f917000010000018ce14e8891404799a12c0e9b7898cf2c";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const search = async () => {
    const dataFetch = await fetch(intialURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth
      }
    });
    let parseData = await dataFetch.json();
    setData(parseData);
  };
  return (
    <div
      style={{
        minHeight: "80vh"
      }}
    >
      <h1>this is homepage</h1>
      <Search search={search} />
    </div>
  );
};

export default Homepage;
