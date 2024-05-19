import React from 'react'
import styles from './DeleteFolderPopup.module.scss'

import CloseSVG from '../../../imgs/Close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { deleteFolder } from '../../../redux/slices/foldersSlice'


const DeleteFolderPopup = ({setIsVisible} : {
  setIsVisible: (i: boolean) => void
}) => {

  const dispatch = useDispatch()

  function deleteFolderBtn() {
    setIsVisible(false);
    dispatch(deleteFolder())
  }

  const {items, deletingItemID} = useSelector((state: RootState) => state.folders);

  const folderDeleteItem = items.find(item => item.id === deletingItemID)
  return (
    <div className={styles.DeleteFolderWrapper}> <div className={styles.heading}>
    <h2>Delete Folder</h2>
    <button onClick={() => setIsVisible(false)}>
      <img src={CloseSVG} alt="Close" />
    </button>
  </div>
  <div className={styles.content}>
    <h2>Do you really want to delete this Folder?</h2>
    {folderDeleteItem ? <div className={styles.folderItem}>
      <h4>{folderDeleteItem.emoji.character}</h4>
      <h3>{folderDeleteItem.title}</h3>
    </div> : ''}
    <div className={styles.ButtonsWrapper}>
      <button onClick={() => setIsVisible(false)} className= {`${styles.Button} ${styles.ButtonGray}`}>Cancel</button>
      <button onClick={() => deleteFolderBtn()} className= {`${styles.Button} ${styles.ButtonRed}`}>Delete</button>
    </div>
  </div>
  </div>
  )
}

export default DeleteFolderPopup