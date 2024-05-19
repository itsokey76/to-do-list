import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {

  const dispatch = useDispatch()
  return <input onChange={(e) => dispatch(setSearchValue(e.target.value))} placeholder="Search..." type="text" />;
};

export default Search;
