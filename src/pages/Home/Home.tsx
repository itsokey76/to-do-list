import React from 'react'
import Calendar from '../../components/Calendar/Calendar'
import Button from '../../components/Button/Button'


import styles from './Home.module.scss'
import Search from '../../components/Search/Search'
import FilterList from '../../components/FilterList/FilterList'
import Sort from '../../components/Sort/Sort'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import TaskItem from '../../components/TaskItem/TaskItem'
import {  useLocation, useParams } from 'react-router-dom'
// import FolderItem from '../../components/Sidebar/FolderItem/FolderItem'



const Home = ({setIsAddTaskVisible, setIsDeleteTaskVisible, setIsFolderManagerVisible, } : {setIsAddTaskVisible: (i: boolean) => void, setIsDeleteTaskVisible:  (i: boolean) => void, setIsFolderManagerVisible: (i: boolean) => void}) => {

  const {items} = useSelector((item: RootState) => item.taskItems)
  const filters = useSelector((item: RootState) => item.filters)

  // const location = useLocation();
  const {id} = useParams()
  const folders = useSelector((state: RootState) => state.folders.items)

  function SortItems() {

    const {isFavorite, isChecked, expiredDate, searchValue} = filters;
    let sortArr = items;


    const location = useLocation();
    if(id){
      const folderItem = folders.find(item => item.id === id);
      if(folderItem){

        sortArr = sortArr.filter(task => task.id === folderItem.tasks.find(taskF => taskF.id === task.id)?.id)
      }
      // sortArr = sortArr.filter(item => item.id ===)
    }
    
    if(isFavorite){
      sortArr = sortArr.filter(item => item.isFavorite)
    }
  
    if(isChecked){
      sortArr = sortArr.filter(item => item.isChecked)
    }
  
    if(searchValue){
      sortArr = sortArr.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    }

   

   

    if( expiredDate.firstDate &&  expiredDate.secondDate){
      const firstDate = new Date(expiredDate.firstDate.year, expiredDate.firstDate.month, expiredDate.firstDate.day).getTime()
      const secondDate = new Date(expiredDate.secondDate.year, expiredDate.secondDate.month, expiredDate.secondDate.day, ).getTime()
      sortArr = sortArr.filter(item => item.expiredDate &&  item.expiredDate.getTime() > firstDate && item.expiredDate.getTime() < secondDate)
    } else  if(expiredDate.firstDate === null && expiredDate.secondDate){
      const secondDate = new Date(expiredDate.secondDate.year, expiredDate.secondDate.month, expiredDate.secondDate.day, ).getTime()
        sortArr = sortArr.filter(item => item.expiredDate &&  item.expiredDate.getTime() < secondDate)

      } else  if(expiredDate.firstDate && expiredDate.secondDate === null){
        const firstDate = new Date(expiredDate.firstDate.year, expiredDate.firstDate.month, expiredDate.firstDate.day).getTime()

        
        sortArr = sortArr.filter(item => item.expiredDate &&  item.expiredDate.getTime() > firstDate)
  
      }
     
    
    
    // if(sortBy === 'newest'){
    //   sortArr = sortArr.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    // }
  
  

    if(location.pathname.includes('/starred/')){
      sortArr = sortArr.filter(item => item.isFavorite === true)
    }

    if(location.pathname.includes('/checked/')){
      sortArr = sortArr.filter(item => item.isChecked === true)
    }
 
    return sortArr
  }
  
  return (
    <div className={styles.sortWrapper}>
          <div className={styles.stuffWrapper}>
          <h2 className={styles.generalHeading}>All Task</h2>
          
            <div className={styles.sortingWrapper}>
              <Search/>
              <FilterList/>
              <Sort/>
            </div>
          
          <div className={styles.TaskWrapper}>
            {SortItems().map((item) => <TaskItem  setIsFolderManagerVisible = {setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible} item = {item}/>)}
            
          </div>
          <div className={styles.TaskBG}></div>
          <div className={styles.BtnWrapperTask}>
          <Button onClick={() => setIsAddTaskVisible(true)}/>
          </div>
          </div>
          <div className={styles.callendarWrapper}>
            <Calendar activeNum = {undefined} isActiveOn = { false} onClickNum={(item) => console.log(item)}/>
          </div>
         </div>
  )
}

export default Home