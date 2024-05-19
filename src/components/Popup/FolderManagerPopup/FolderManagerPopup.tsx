import React from 'react'
import styles from './FolderManagerPopup.module.scss'

import CloseSVG from '../../../imgs/Close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { IFolder, setTasks } from '../../../redux/slices/foldersSlice'
import { ITaskItem } from '../../../redux/slices/taskItemsSlice'
const FolderManagerPopup = ({setIsVisible} : {setIsVisible: (i: boolean) => void}) => {

  const folders = useSelector((state: RootState) => state.folders.items);
  const {items, managerTaskID} = useSelector((state: RootState) => state.taskItems);
  const taskItem = items.find(item => item.id === managerTaskID);

  // console.log(taskItem)

  function isActive(item: IFolder) {
    if(taskItem && item.tasks.find(itemF => itemF.id === taskItem.id)){
      return true
    } else{
      return   false
    }
  }
  const dispatch = useDispatch()

  console.log(taskItem)          
  function onClickFolder(item: IFolder) {
    let tasksArr: ITaskItem[];
    if(taskItem){
      console.log('taskItem')
      if(item.tasks.find(item => item.id === taskItem.id)){
        tasksArr = item.tasks.filter(item => item.id !== taskItem.id)
      } else {
        tasksArr = [...item.tasks, taskItem]
      }
      dispatch(setTasks({
        id: item.id,
        tasks: tasksArr
      }))
    }
    // if(taskItem && item.tasks.find(itemF => itemF.id === taskItem.id)){
    //   item.tasks = item.tasks.filter(item => item.id !== taskItem.id)
    // } else {
    //   if(taskItem){
    //     item.tasks = [...item.tasks, taskItem]
    //   }
    // }
  }
  
  return (
    <div className={styles.FolderManagerWrapper}>
       <div className={styles.heading}>
    <h2>Folder Manager</h2>
    <button onClick={() => setIsVisible(false)}>
      <img src={CloseSVG} alt="Close" />
      
    </button>
  </div>
  <div className={styles.content}>
    <h2>Folders</h2>
    <div className={styles.FoldersWrapper}>
      {folders.map(item => {
        return <div onClick={() => onClickFolder(item)} className={styles.FolderItem}>
        <div className={styles.name}>
        <span>{item.emoji.character}</span>
        <h2>{item.title}</h2>
        </div>
        <button >
          {isActive(item) ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <rect width="18" height="18" rx="3" fill="#7046F8"/>
  <path d="M7.72743 10.7804L5.94699 9L5.35352 9.59348L7.72743 11.9674L12.8144 6.88044L12.2209 6.28696L7.72743 10.7804Z" fill="white"/>
</svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <rect width="18" height="18" rx="5" fill="#272D38"/>
  <rect x="2" y="2" width="14" height="14" rx="5" fill="#1C2029"/>
</svg>}
        
        </button>
      </div>
      })}
      
    </div>
  </div>
    </div>
  )
}

export default FolderManagerPopup