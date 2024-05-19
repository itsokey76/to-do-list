import { createSlice } from '@reduxjs/toolkit'
import { ITaskItem } from './taskItemsSlice';


export interface IEmoji{
  character :string;
  codePoint: string;
  group: string;
  slug: string;
  subGroup: string;
  unicodeName: string
}
export interface IFolder {
  id: string,
  title: string,
  emoji: IEmoji,
  tasks: ITaskItem[]
}
const initialState: {
  items: IFolder[],
  deletingItemID: undefined | string
} = {
items: [],
deletingItemID: ''
}

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    addFolder(state, action)  {
      state.items = [...state.items, action.payload]
    },
    deleteFolder(state){
      if(state.deletingItemID){
        state.items = state.items.filter(item => item.id !== state.deletingItemID)

      }
    },
    setDeletingItemID(state, action){
      state.deletingItemID = action.payload
    },
    setTasks(state, action){
      const item = state.items.find(i => i.id === action.payload.id);
      console.log(item)

      if(item){
        console.log('saf')
        item.tasks = action.payload.tasks
      }
    }
  }
});

export const {addFolder, deleteFolder, setDeletingItemID, setTasks} = foldersSlice.actions

export default foldersSlice.reducer