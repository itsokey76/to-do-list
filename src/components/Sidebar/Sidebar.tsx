 import React from 'react'

import AllSVG from '../../imgs/All.svg'
import StarredSVG from '../../imgs/Starred.svg'
import CompletedSVG from '../../imgs/Completed.svg'

 import styles from './Sidebar.module.scss'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import FolderItem from './FolderItem/FolderItem'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
 
 const Sidebar = ({setIsFolderVisible, setIsDeleteFolderVisible} : {setIsFolderVisible: () => void, setIsDeleteFolderVisible: () => void}) => {
  

const GeneralLinksArr  = [
  {title: 'All',
    path: '/',
    img: AllSVG,
    selector: '/'
  },
  {title: 'Starred',
    path: '/starred/',
    img: StarredSVG,
    selector: 'starref'
  },
  {title: 'Checked',
    path: '/checked/',
    img: CompletedSVG,
    selector: 'checked'
  },
  
]

  const folders = useSelector((state: RootState) => state.folders.items)
  const navigate = useNavigate()
   return (
    <div className={styles.sidebarWrapper}>
    <Link to={'/'}>
    <div className={styles.logo}>
      <h1>To-Do-List</h1>
    </div>
    </Link>
    <div className={styles.options}>
    <div className={styles.optionBlock}>
    <h2 className={styles.optionName}>General</h2>
    <ul>
      {GeneralLinksArr.map(item => {
        return <li onClick={() => navigate(`${item.path}`)} className={styles.optionItem}>
        <div className={styles.ItemContent}>
          <img src={item.img} alt={item.selector} />
          <a href="#">{item.title}</a>
        </div>
      </li>
      })}
      
      
    </ul>
    </div>
    <div className={styles.optionBlock}>
    <h2 className={styles.optionName}>Optional</h2>
    <ul>
      {folders ? folders.map((item) => {
        return <FolderItem setIsDeleteFolderVisible = {() => setIsDeleteFolderVisible()} key={item.id} item={item}/>
      }) : ''}
    </ul>
    <div onClick={() => setIsFolderVisible()} className={styles.optionItem}>
        <div className={styles.ItemContent}>
          <img src={AllSVG} alt="" />
          <a href="#">Add Folder</a>
        </div>
      </div>
    </div>
    </div>
  </div>
   )
 }
 
 export default Sidebar