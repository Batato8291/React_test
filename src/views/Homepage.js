import React, { useState } from "react";
import Search from "../components/Search";
import "../styles/all.css";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
  let [data, setData] = useState(null);
  const auth = "563492ad6f917000010000018ce14e8891404799a12c0e9b7898cf2c";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const search = async () => {
    console.log("searchhhhh!");
    const dataFetch = await fetch(intialURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth
      }
    });
    // console.log("aaa", await dataFetch.json());
    let parseData = await dataFetch.json();
    console.log("eee");
    setData(parseData);
  };
  return (
    <div
      style={{
        minHeight: "80vh"
      }}
    >
      <h1>this is homepage</h1>
      <Search
        search={() => {
          search();
        }}
      />
      <div className="pictures">
        {/* 等data收到資料 */}
        {data &&
          data.photos.map((d) => {
            return <Picture key={d.id} data={d} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
