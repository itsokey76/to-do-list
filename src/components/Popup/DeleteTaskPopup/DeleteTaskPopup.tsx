import React from 'react'
import CloseSVG from '../../../imgs/Close.svg'

import styles from './DeleteTaskPopup.module.scss'
import { useDispatch } from 'react-redux'
import { DeleteTask } from '../../../redux/slices/taskItemsSlice'
import { useNavigate } from 'react-router-dom'

const DeleteTaskPopup = ({setIsVisible} : {setIsVisible: (i: boolean) => void}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function deleteT() {
    dispatch(DeleteTask())
    setIsVisible(false)
navigate('/')
  }
  return (
    <div className={styles.DeleteFolderWrapper}> <div className={styles.heading}>
    <h2>Delete Folder</h2>
    <button onClick={() => setIsVisible(false)}>
      <img src={CloseSVG} alt="Close" />
    </button>
  </div>
  <div className={styles.content}>
    <h2>Do you really want to delete this Task?</h2>
    {/* {folderDeleteItem ? <div className={styles.folderItem}>
      <h4>{folderDeleteItem.emoji.character}</h4>
      <h3>{folderDeleteItem.title}</h3>
    </div> : ''} */}
    <div className={styles.ButtonsWrapper}>
      <button onClick={() => setIsVisible(false)} className= {`${styles.Button} ${styles.ButtonGray}`}>Cancel</button>
      <button onClick={() => deleteT()}  className= {`${styles.Button} ${styles.ButtonRed}`}>Delete</button>
    </div>
  </div>
  </div>
  )
}

export default DeleteTaskPopup