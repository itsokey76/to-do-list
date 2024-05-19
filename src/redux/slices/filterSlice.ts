import { createSlice } from '@reduxjs/toolkit'
import { IDateItem } from '../../components/Sort/Sort';


export interface IFilters {
  sortBy: 'newest' | 'oldest' | 'dateUp' | 'dateDown',
  expiredDate: {
    firstDate: null | IDateItem;
    secondDate: null | IDateItem;
  };
  isChecked: boolean;
  isFavorite: boolean;
  searchValue: string
}
const initialState: IFilters = {
  sortBy: 'newest' ,
  expiredDate: {
    firstDate: null ,
    secondDate: null
  },
  isChecked: false,
  isFavorite: false,
  searchValue: ''
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
setCheckeked(state, action){
  state.isChecked = action.payload
},
setFavorite(state, action){
  state.isFavorite = action.payload
},
setSort(state, action){
  state.sortBy = action.payload
},
setDate(state, action){
  state.expiredDate = {
    firstDate: action.payload.firstDate,
    secondDate: action.payload.secondDate
  }
},


setSearchValue(state, action){
  state.searchValue = action.payload
}
  }
});

export const {setCheckeked, setSearchValue, setFavorite, setSort, setDate} = filterSlice.actions

export default filterSlice.reducer