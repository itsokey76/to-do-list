import { createSlice } from '@reduxjs/toolkit'
export  interface IAttribute{
  title: string;
  firstColor: string;
  secondaryColor: string;
  id: string
}
const initialState: {attributes: IAttribute[]} = {
  attributes: []
}

const attributesSlice = createSlice({
  name: 'atrributes',
  initialState,
  reducers: {
    addAttributeItem(state, action){
state.attributes = [action.payload, ...state.attributes]
    },
    deleteAttributeItem(state, action){
      state.attributes = state.attributes.filter(item => item.id !== action.payload)
          }
  }
});

export const {addAttributeItem, deleteAttributeItem} = attributesSlice.actions

export default attributesSlice.reducer