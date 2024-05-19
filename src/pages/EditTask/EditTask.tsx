import React, { useEffect, useState } from 'react'
import styles from './EditTask.module.scss'

import StarSVG from '../../imgs/Star.svg'
import StrelkaSVG from '../../imgs/Strelka.svg'
import DeleteSVG from '../../imgs/Delete.svg'
import Button from '../../components/Button/Button'
import Calendar from '../../components/Calendar/Calendar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IAttribute, deleteAttributeItem } from '../../redux/slices/attributesSlice'
import { ITaskItem, changeTaskItem, setDeletingTaskID, setManagerTaskID } from '../../redux/slices/taskItemsSlice'
const EditTask = ({setIsDeleteTaskVisible, setIsFolderManagerVisible}: {setIsDeleteTaskVisible: (i: boolean) => void,setIsFolderManagerVisible: (i: boolean) => void}) => {

  const {id} = useParams()
  const items = useSelector((state: RootState) => state.taskItems.items);
  const currItem = items.find(item => item.id === id);
  const [titleValue, setTitleValue] = useState('');
  const [descrValue, setDescrValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [attributes, setAttributes] = useState<undefined | IAttribute[]>([]);
  const [expiredDate, setExpiredDate] = useState<Date | null>(null);


  const [popupVisible, isPopupVisible] = useState(false)

  function onDelete() {
    if(id){
      dispatch(setDeletingTaskID(id));
      setIsDeleteTaskVisible(true);
    }
  }

  function openFolderManager() {
    setIsFolderManagerVisible(true);
    dispatch(setManagerTaskID(id))
  }

  
  let expDateObj: {year: number, month: number, day: number} | undefined = undefined;
  if(expiredDate){
   expDateObj = {
      day: expiredDate?.getDate(),
      month: expiredDate?.getMonth(),
      year: expiredDate?.getFullYear()
    }
  }
  console.log(expDateObj)

  // const [itemFolders, setItemFolders] = useState('');

  useEffect(() => {

    if(currItem){
      setTitleValue(currItem.title);
      setDescrValue(currItem.description)
      setIsChecked(currItem.isChecked);
      setAttributes(currItem.attribute);
      setIsFavorite(currItem.isFavorite);
      setExpiredDate(currItem.expiredDate)
      
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const GlobalAttributes = useSelector((state: RootState) => state.attributes.attributes)



  

  function changeDescr(value: string) {
    setDescrValue(value)
  }

  function saveItem() {
    console.log('saved')
    if(currItem && titleValue && id){
      const savedItem: ITaskItem = {
        id: id,
        title: titleValue,
        description: descrValue,
        expiredDate: expiredDate,
        isChecked: isChecked,
        isFavorite: isFavorite,
        attribute: attributes,
        createdDate: currItem.createdDate
      }

      dispatch(changeTaskItem(savedItem))
      console.log(savedItem)
    }
  }

  function changeExpDate(date: {year: number, month: number, day: number}) {
    setExpiredDate(new Date(date.year, date.month, date.day))
  }
  
  const dispatch = useDispatch()
  useEffect(() => {
    let arrItem: undefined | IAttribute[] = undefined;
    if(Array.isArray(attributes) && Array.isArray(GlobalAttributes)){
      arrItem = attributes?.filter(item => item.id === GlobalAttributes.find(itemA => itemA.id === item.id)?.id);
    }

    if(arrItem?.length === 0){
      arrItem = undefined
    }

    setAttributes(arrItem)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GlobalAttributes])

  function onClickAttribute(itemA: IAttribute) {
      if(attributes?.find(item => item.id === itemA.id)){
        const att = attributes.filter(item => item.id !== itemA.id)
        if(att){
          setAttributes(att)
        } else{
          setAttributes(undefined)
        }
        
      } else{
        if(attributes){
          setAttributes(prev => [ itemA , ...prev!])

        } else{
          setAttributes([itemA])
        }
      }
    

    
  }
function isActive(id: string): boolean {
  if(attributes?.find(item => item.id === id)){
    return true
  }
  return false
}
  console.log(attributes)
  return (
    <div className={styles.EditTaskWrapper}>
      <h2 className={styles.GeneralTitle}>Edit Task</h2>
      <div className={styles.wrappper}>
      <div className={styles.firstDivWrappper}>
        <div className={styles.InputTitleWrapper}>
          <div className={styles.titleStar}>
            <h3>Task Name</h3>
            <button>
              <img src={StarSVG} alt="StarBtn" />
            </button>
          </div>
          <div className={styles.SortWrapper}>
          <div className={styles.inputChecked}>
          <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} placeholder='Edit Task...' type="text" />
          <button onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
  <rect width="46" height="46" rx="5" fill="#7046F8"/>
  <path d="M19.75 27.55L15.2 23L13.6833 24.5167L19.75 30.5833L32.75 17.5833L31.2333 16.0667L19.75 27.55Z" fill="white"/>
</svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
  <rect width="46" height="46" rx="5" fill="#272D38"/>
  <rect x="2" y="2" width="42" height="42" rx="5" fill="#1C2029"/>
</svg>}
          
          </button>
          </div>
          <div className={styles.BtnsWrapper}>
            <button onClick={() => openFolderManager()} className={styles.FolderBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M7.58333 22.75H18.4167C19.5659 22.75 20.6681 22.2935 21.4808 21.4808C22.2935 20.6681 22.75 19.5659 22.75 18.4167V5.41667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.58333 10.8333H14.0833M10.8333 7.58333V14.0833M17.3333 18.4167H4.33333C4.04602 18.4167 3.77047 18.3025 3.5673 18.0994C3.36414 17.8962 3.25 17.6207 3.25 17.3333V4.33333C3.25 4.04602 3.36414 3.77047 3.5673 3.5673C3.77047 3.36414 4.04602 3.25 4.33333 3.25H17.3333C17.6207 3.25 17.8962 3.36414 18.0994 3.5673C18.3025 3.77047 18.4167 4.04602 18.4167 4.33333V17.3333C18.4167 17.6207 18.3025 17.8962 18.0994 18.0994C17.8962 18.3025 17.6207 18.4167 17.3333 18.4167Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Folder Manager
            </button>
            <button  className={styles.AttributeBtn}>
              <div onClick={() => isPopupVisible(prev => !prev)} className={styles.attributeItem}> Soon</div>
              <img style={{transform: 'rotate(-90deg)'}} src={StrelkaSVG} alt="" />
              {popupVisible  ? <div className={styles.AttributePopup}>
                {GlobalAttributes ? GlobalAttributes?.map(item => {
                  return <div  key={item.id} className={`${styles.itemWrapper} ${isActive(item.id) ? styles.active : ''}`}>
                  <div onClick={() => onClickAttribute(item)} style={{backgroundColor: item.firstColor, borderColor: item.secondaryColor, boxShadow: `0px 1px 3.4px 0px ${item.firstColor}`}} className={styles.attributeItem}> {item.title}</div>
    <button onClick={() => dispatch(deleteAttributeItem(item.id))}><img src={DeleteSVG} alt="Delete" /></button>
                    </div>
                }) : 'none'}
                
                
                
                
                
              </div> : ''}
            </button>
          </div>
          </div>
        </div>
        <div className={styles.TextAreaWrapper}>
          <h2>Decription</h2>
          <textarea onChange={(e) => changeDescr(e.target.value)} value={descrValue} cols={30} rows={10}></textarea>
        </div>
        <div className={styles.BtnsWrapperBottom}>
          <button onClick={() => onDelete()} className={styles.DeleteBtn}>Delete Task</button>
          <Button onClick={() => saveItem()} title = 'Save'/>
        </div>
      </div>
      <div className={styles.callendarWrapper}>
        <h2>Expired Date</h2>
        <Calendar onClickNum={(date) => changeExpDate(date)} activeNum={expDateObj} isActiveOn = {true} />
      </div>
      </div>
    </div>
  )
}

export default EditTask