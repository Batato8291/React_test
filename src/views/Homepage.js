import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import "../styles/all.css";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  const auth = "563492ad6f917000010000018ce14e8891404799a12c0e9b7898cf2c";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    // console.log("aaa", await dataFetch.json());
    let parseData = await dataFetch.json();

    setData(parseData.photos);
  };
  // 先執行一次search()
  useEffect(() => {
    search(intialURL);
  }, []);
  return (
    <div
      style={{
        minHeight: "80vh",
      }}
    >
      <h1 style={{ margin: ".5rem 2rem" }}>this is fucking homepage</h1>
      {/* search */}
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {/* 等data收到資料 */}
        {data &&
          data.map((d) => {
            return <Picture key={d.id} data={d} />;
          })}
      </div>
      <div className="morePictures">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
