import { createSlice } from '@reduxjs/toolkit'
import { IAttribute } from './attributesSlice';


export interface ITaskItem{
  id: string,
  title: string;
  description: string;
  expiredDate: null | Date;
  createdDate: Date,
  attribute: IAttribute[] |  undefined,
  isChecked: boolean,
  isFavorite: boolean
}
const initialState: {items: ITaskItem[], deleteingTaskID: string, managerTaskID: string} = {
  items: [],
  deleteingTaskID: '',
  managerTaskID: ''
}

const taskItemsSlice = createSlice({
  name: 'taskItems',
  initialState,
  reducers: {
    addTaskItem(state, action ){
      state.items = [ ...state.items, action.payload]
    },
    changeIsChecked(state, action){
      const item = state.items.find(item => item.id === action.payload);
      if(item){
        item.isChecked = !item.isChecked

      }
    },
    changeIsFavorite(state, action){
      const item = state.items.find(item => item.id === action.payload);
      if(item){
        item.isFavorite = !item.isFavorite

      }
    },
    fixTaskItemAttributes(state, action ){
      const item = state.items.find(item => item.id === action.payload.id)
      if(item){
   item.attribute = action.payload.attr
      }
    },
    changeTaskItem(state, action){
      const item = state.items.find(ItemA => ItemA.id === action.payload.id);
      const {description, title, isChecked, isFavorite, expiredDate, attribute}  = action.payload
      if(item){
       item.isChecked = isChecked
       item.description = description;
       item.title = title;
       item.isFavorite = isFavorite;
       item.expiredDate = expiredDate;
       item.attribute = attribute
      }
    },
    setDeletingTaskID(state, action){
      state.deleteingTaskID = action.payload
    },
    setManagerTaskID(state, action){
      state.managerTaskID = action.payload
    },
    DeleteTask(state){
      if(state.deleteingTaskID){
        state.items = state.items.filter(item => item.id !== state.deleteingTaskID)
      }
    }
  }
});

export const {addTaskItem, fixTaskItemAttributes, changeIsChecked, changeIsFavorite, changeTaskItem, setDeletingTaskID, DeleteTask, setManagerTaskID} = taskItemsSlice.actions

export default taskItemsSlice.reducer