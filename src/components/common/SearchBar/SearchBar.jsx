import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "react-bootstrap";
import "./SearchBar.style.css";
import { useSearchKeyword } from "../../../app/store/search";
const SearchBar = () => {
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();
  const handleSearch = (event) => {
    event.preventDefault();
  };
  return (
    <Form className="searchbar-container" onSubmit={handleSearch}>
      <FontAwesomeIcon
        icon="fa-solid fa-magnifying-glass"
        className="glass-icon"
      />
      <Form.Control
        type="text"
        placeholder="제목으로 일기장 검색"
        className=" mr-sm-2 searchbar-input"
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        value={searchKeyword}
      />
    </Form>
  );
};

export default SearchBar;
