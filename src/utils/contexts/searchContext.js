import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
};
