import React, { useEffect, useState } from 'react'

import CloseSVG from '../../../imgs/Close.svg'

import styles from './AddFolderPopup.module.scss'
import Button from '../../Button/Button'

import StrelkaSVG from '../../../imgs/Strelka.svg'
import axios from 'axios'
import { IEmoji, addFolder } from '../../../redux/slices/foldersSlice'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


const AddFolderPopup = ({setIsVisible} : {setIsVisible: (i: boolean) => void}) => {

  const [popupVisible, setIsPopupVisible] = useState(true);
  const [titleValue, setTitleValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(1)
  const [emojisItems, setEmojisItems] = useState<IEmoji[]>([])
  const [activeEmoji, setActiveEmoji] = useState<IEmoji>({
    "slug": "grinning-squinting-face",
    "character": "\ud83d\ude06",
    "unicodeName": "grinning squinting face",
    "codePoint": "1F606",
    "group": "smileys-emotion",
    "subGroup": "face-smiling"
    })

  function addFolderFunc() {
    if(titleValue){
      setIsVisible(false)
    dispatch(addFolder({
      id: uuidv4(),
      title: titleValue,
      emoji: activeEmoji,
      tasks: []
    }))
    }
    
  }

 const dispatch = useDispatch()

  
function plusIndex(){
  if(emojisItems && activeIndex !== 11){
    setActiveIndex(prev => prev + 1)
  }
}

function minusIndex() {
  if(emojisItems){
    if(activeIndex !== 1)
    setActiveIndex(prev => prev - 1)
  }
}

function setEmoji(item: IEmoji) {
  setActiveEmoji(item);
  setIsPopupVisible(false)
}

  useEffect(() => {
    axios.get('https://emoji-api.com/categories/smileys-emotion?access_key=c0cf0f57a2f8ff743b7efaa9ac298635f95448f4')
  .then(item => setEmojisItems(item.data as IEmoji[]))
  }, [])
  console.log(activeIndex)
  return (
    <div className={styles.AddFolderWrapper}>
      <div className={styles.heading}>
      <h2>Add New Folder</h2>
      <button onClick={() => setIsVisible(false)}>
        <img src={CloseSVG} alt="Close" />
      </button>
    </div>
    <div className={styles.content}>
      <div className={styles.inputWrapper}>
        <div className={styles.IconWrapper}>
          <h2>Icon</h2>
          <div onClick={() => setIsPopupVisible(prev => !prev)} className={styles.IconBox}>{activeEmoji.character}</div>
          {popupVisible ? <div className={styles.IconsPopup}>
            <div className={styles.title}>Select Emoji</div>
            <div className={styles.EmojiWrapper}>
              {emojisItems ? emojisItems.slice((activeIndex * 15) - 15, activeIndex * 15).map((item, i) => {
                return <div key={i} onClick={() => setEmoji(item)} className={styles.EmojiItem}>{item.character}</div>
              }) : ''}
            </div>
            <div className={styles.strelki}>
              <button onClick={() => minusIndex()}><img src={StrelkaSVG} alt="" /></button>
              <button onClick={() => plusIndex()}><img style={{ transform: 'rotate(180deg)' }} src={StrelkaSVG} alt="" /></button>
            </div>
          </div> : 
          ''}
        </div>
        <div className={styles.InputItem}>
          <h2>Folder Name</h2>
          <input defaultValue={titleValue} onChange={(e) => setTitleValue(e.target.value)} type="text" />
        </div>
      </div>
      <div className={styles.BtnWrapper}>
        <div></div>
        <Button onClick={() => addFolderFunc()} />
      </div>
    </div>
    </div>
  )
}

export default AddFolderPopup