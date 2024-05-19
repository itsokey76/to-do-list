import './App.scss'
import styles from './App.module.scss'





import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import AddTaskPopup from './components/Popup/AddTaskPopup/AddTaskPopup'
import Popup from './components/Popup/Popup'
import {  useState } from 'react'
import AddFolderPopup from './components/Popup/AddFolderPopup/AddFolderPopup'
import DeleteFolderPopup from './components/Popup/DeleteFolderPopup/DeleteFolderPopup'
// import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import EditTask from './pages/EditTask/EditTask'
import DeleteTaskPopup from './components/Popup/DeleteTaskPopup/DeleteTaskPopup'
import FolderManagerPopup from './components/Popup/FolderManagerPopup/FolderManagerPopup'
// import axios from 'axios'
// import axios from 'axios'

// import TaskItem from './components/TaskItem/TaskItem.jsx'

function App() {


  


  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isAddFolderVisible, setIsAddFolderVisible] = useState(false);
  const [isDeleteFolderVisible, setIsDeleteFolderVisible] = useState(false);
  const [isDeleteTaskVisible, setIsDeleteTaskVisible] = useState(false);
  const [isFolderManagerVisible, setIsFolderManagerVisible] = useState(false);

  // const routesArr = [
  //   {
  //     title: 'All Tasks',
  //     route: 'all'    },
  //     {
  //       title: 'Starred',
  //       route: 'all'    },
  //       {
  //         title: 'Checked',
  //         route: 'Checked'    },
  // ]

  
  return (
    <>
    {isFolderManagerVisible ? 
      <Popup>
    <FolderManagerPopup setIsVisible = {(i: boolean) => setIsFolderManagerVisible(i)}/>
    </Popup> : ''
    }
    {isDeleteTaskVisible ? <Popup>
      <DeleteTaskPopup setIsVisible = {(i: boolean) => setIsDeleteTaskVisible(i)}/>
    </Popup> : ''}
    {isDeleteFolderVisible ? <Popup>
      <DeleteFolderPopup setIsVisible = {(i: boolean) => setIsDeleteFolderVisible(i)}/>
    </Popup> : ''}
    {isAddFolderVisible ? 
      <Popup>
    <AddFolderPopup setIsVisible = {(i: boolean) => setIsAddFolderVisible(i)}/>
    </Popup> : ''
    }
    {isAddTaskVisible ? 
      <Popup>
    <AddTaskPopup setIsVisible = {(i: boolean) => setIsAddTaskVisible(i)}/>
    </Popup> : ''
    }
    
    
     <div className={styles.root}>
      <Sidebar setIsDeleteFolderVisible = {() => setIsDeleteFolderVisible(true)} setIsFolderVisible = {() => setIsAddFolderVisible(prev => !prev)}/>
      <div className={styles.generalWrapper}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home  setIsFolderManagerVisible = {setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible} setIsAddTaskVisible = {setIsAddTaskVisible}/>} ></Route>
          <Route path='/folder/:id' element={<Home setIsFolderManagerVisible = {setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible} setIsAddTaskVisible = {setIsAddTaskVisible}/>} ></Route>
          <Route path='/checked/' element={<Home setIsFolderManagerVisible = {setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible} setIsAddTaskVisible = {setIsAddTaskVisible}/>} ></Route>
          <Route path='/starred/' element={<Home setIsFolderManagerVisible = {setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible} setIsAddTaskVisible = {setIsAddTaskVisible}/>} ></Route>
          <Route path='/task/:id' element={<EditTask setIsFolderManagerVisible ={setIsFolderManagerVisible} setIsDeleteTaskVisible = {setIsDeleteTaskVisible}/>} ></Route>
        </Routes>
        
        {/* <div className={styles.sortWrapper}>
          <div className={styles.stuffWrapper}>
          <h2 className={styles.generalHeading}>All Task</h2>
          
            <div className={styles.sortingWrapper}>
              <Search/>
              <FilterList/>
              <Sort/>
            </div>
          
          <div className={styles.TaskWrapper}>
            {SortItems().map((item) => <TaskItem {...item}/>)}
            
          </div>
          <div className={styles.TaskBG}></div>
          <div className={styles.BtnWrapperTask}>
          <Button onClick={() => setIsAddTaskVisible(true)}/>
          </div>
          </div>
          <div className={styles.callendarWrapper}>
            <Calendar onClickNum={(item) => console.log(item)}/>
          </div>
         </div> */}
      </div>
     </div>
    </>
  )
}

export default App
