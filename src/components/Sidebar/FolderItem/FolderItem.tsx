import React, { useEffect,useRef, useState } from 'react'
import styles from './FolderItem.module.scss'
import { IFolder, setDeletingItemID } from '../../../redux/slices/foldersSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const FolderItem = ({item, setIsDeleteFolderVisible}: {item: IFolder, setIsDeleteFolderVisible: () => void}) => {

  const LiElement = useRef<null | HTMLLIElement>(null)
  const PopupElement = useRef<null | HTMLDivElement>(null)
console.log(LiElement.current)

const [eventClick, setEventClick] = useState<null | React.MouseEvent<HTMLLIElement, MouseEvent>>(null);
const [isVisible, setIsVisible] = useState(false)

function OnClickContext(e: React.MouseEvent<HTMLLIElement, MouseEvent>){
  e.preventDefault()
  setEventClick(e)
  setIsVisible(true)
}

const navigate = useNavigate()

function onClickFunc(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  if(e.target instanceof Element){
    if(e.target.className !== styles.FolderPopup && e.target.className !== styles.popupItem){
      navigate(`/folder/${item.id}`)
    }
  }
}

function HandleClick(e: MouseEvent) {
  if(PopupElement.current && e.target !== PopupElement.current){
    setIsVisible(false)
    setEventClick(null)
  }
  console.log(PopupElement.current, e.target !== PopupElement.current)
}
const dispatch = useDispatch()
function deleteFolder(){
  setIsDeleteFolderVisible();
  dispatch(setDeletingItemID(item.id))
  navigate(`/`)

}

useEffect(() => {
  window.addEventListener('click', (e) => HandleClick(e))


  return () => window.removeEventListener('click', HandleClick)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (

    //onContextMenu={(e) => EventFunc(e)}
    <li onClick={(e) => onClickFunc(e)} ref={LiElement} onContextMenu={(e) => OnClickContext(e)} className={styles.optionItem}>
        <div className={styles.ItemContent}>
          <div className={styles.emojiImg}>{item.emoji.character}</div>
          <a>{item.title}</a>
        </div>
        {isVisible && eventClick ? <div ref={PopupElement} style={{left: `${eventClick.pageX}px`, top: `${15}px`}} className={styles.FolderPopup}>
          <div onClick={() => deleteFolder()} className={styles.popupItem}>Delete</div>
          <div className={styles.popupItem}>Edit</div>
          <div className={styles.popupItem}>Add To Folder</div>
        </div> : ''}
      </li>
  )
}

export default FolderItem