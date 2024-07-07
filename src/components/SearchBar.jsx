import React from 'react';

function SearchBar() {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search for cities"
        className="w-full max-w-md px-4 py-2 text-black rounded-md bg-gray-800"
      />
    </div>
  );
}

export default SearchBar;
