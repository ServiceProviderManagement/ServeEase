import { useState } from "react";
import { FaSearch } from "react-icons/fa";


import "./SB.css";



export const SB = ({ setResults }) => {
  const [input, setInput] = useState("");

  // const fetchData = (value) => {
  //   fetch("http://localhost:49471/servease/SignUp")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const results = json.filter((user) => {
  //         return (
  //           value &&
  //           user &&
  //           user.first_name &&
  //           user.first_name.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //     });
  // };


  const fetchData = (value) => {
    fetch("http://localhost:/servease/serviceprovider")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&(
              user.profession &&
              user.profession.toLowerCase().includes(value)
              || 
              user.experties &&
              user.experties.toLowerCase().includes(value)
              || 
              user.description &&
              user.description.toLowerCase().includes(value)
              )
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search services..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};