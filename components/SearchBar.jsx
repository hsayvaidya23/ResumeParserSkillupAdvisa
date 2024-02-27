import React from 'react';

const SearchBar = ({ searchText, setSearchText, onSearchChange, context }) => {
  let placeholderText = "Search...";
  if (context === "courses") {
    placeholderText = "Search by course name";
  } else if (context === "jobs") {
    placeholderText = "Search by company name or job category or positions";
  }

  return (
    <form className="relative w-full flex-center">
      <input
        type="text"
        value={searchText}
        onChange={onSearchChange}
        placeholder={placeholderText}
        className="search_input" 
      />
    </form>
  );
};

export default SearchBar;