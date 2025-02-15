import { useState } from "react";
import "./SearchBar.css";
var data = require("./MOCK_DATA.json");

export default function SearchBar() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const services = item.services_name.toLowerCase();

              return (
                searchTerm &&
                services.startsWith(searchTerm) &&
                services !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.services_name)}
                className="dropdown-row"
                key={item.services_name}
              >
                {item.services_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
