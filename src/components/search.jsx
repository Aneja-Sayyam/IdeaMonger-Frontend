import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputPicker, Icon } from "rsuite";

const Search = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const getItems = (word) => {
    const body = {
      searchInput : word
    }
    fetch(props.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setItems(data);
      })
      .catch((e) => console.log("Oops, error", e));
  };
  const handleSearch = (word) => {
    console.log(word);

    if (word === "") {
      setLoading(false);
      //   console.log(word);
      return;
    }
    setLoading(true);
    getItems(word);
  };
  return (
    <InputPicker
      style={props.style}
      data={items}
      placeholder="Search..."
      labelKey="fullName"
      valueKey="id"
      onSelect={(value) => { window.open(`/profile/${value}`,"_top")}}
      renderMenuItem={(label, item) => {
        return (
            <div>
              <img
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "0 0",
                  marginRight: 10,
                }}
                src={item.profileImage}
                alt={<Icon icon="user-circle" />}
              />
              {label}
            </div>
        );
      }}
      onSearch={handleSearch}
      renderMenu={(menu) => {
        if (loading) {
          return (
            <p style={{ padding: 4, color: "#999", textAlign: "center" }}>
              <Icon icon="spinner" spin /> Loading...
            </p>
          );
        }
        return menu;
      }}
    />
  );
};

export default Search;
