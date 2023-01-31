import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [nameFilter, setNameFilter] = useState("");
  const searchRef = useRef();
  const query =
    nameFilter.length === 0 ? "" : `?orderBy="name"&equalTo="${nameFilter}"`;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (nameFilter === searchRef.current.value) {
        fetch(
          `https://react-hook-summary-93283-default-rtdb.firebaseio.com/ingredients.json` +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngrdients = [];
            for (const key in responseData) {
              loadedIngrdients.push({
                id: key,
                name: responseData[key].name,
                amount: responseData[key].amount,
              });
            }
            props.onSearchName(loadedIngrdients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nameFilter, props.onSearchName,searchRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={searchRef}
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
