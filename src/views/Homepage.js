import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import "../styles/all.css";
import Picture from "../components/Picture";

const Homepage = () => {
  // data
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPege] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f917000010000018ce14e8891404799a12c0e9b7898cf2c";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=16";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=1`;

  const search = async (url) => {
    setPege(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth
      }
    });
    // console.log("aaa", await dataFetch.json());
    let parseData = await dataFetch.json();

    setData(parseData.photos);
  };

  // load more pictures
  const loadMorePicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
    }
    setPege(page + 1);

    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth
      }
    });
    // console.log("aaa", await dataFetch.json());
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  // useEffect 先執行一次search()
  useEffect(() => {
    search(intialURL);
  }, []);
  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div
      style={{
        minHeight: "80vh"
      }}
    >
      <h1 style={{ margin: ".5rem 2rem" }}>this is fucking homepage</h1>
      {/* search */}
      <Search
        search={() => {
          setCurrentSearch(input);
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
        <button onClick={loadMorePicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
