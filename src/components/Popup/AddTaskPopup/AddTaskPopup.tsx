import React, {useEffect, useState } from 'react'
import Calendar from '../../Calendar/Calendar'
import Button from '../../Button/Button'


import styles from './AddTaskPopup.module.scss'

import CloseSVG from'../../../imgs/Close.svg'
import StrelkaSVG from'../../../imgs/Strelka.svg'
import DeleteSVG from '../../../imgs/Delete.svg'

import { useDispatch, useSelector } from 'react-redux'
import { ITaskItem, addTaskItem } from '../../../redux/slices/taskItemsSlice'
import { v4 as uuidv4 } from 'uuid';
import AddAttribute from '../../AddAttribute/AddAttribute'
import { RootState } from '../../../redux/store'
import { IAttribute, deleteAttributeItem } from '../../../redux/slices/attributesSlice'
// import Popup from '../Popup'

const AddTaskPopup = ({setIsVisible} : {
  setIsVisible: (i: boolean) => void
}) => {


  const {attributes} = useSelector((state: RootState) => state.attributes)


  const dispatch = useDispatch();

  const [actualDate, setActualDate] = useState<null | {day: number, month: number, year: number}>(null)
  const [isPopup, setIsPopup] = useState(false)
  const [attrVisible, setAttrVisible] = useState(false)
  const [addAttrVisible, setAddAttrVisible] = useState(false);
  const [attributesArr, setAttributesArr] = useState<undefined |IAttribute[]>()

  function SelectDateFunc(item: {day: number, month: number, year: number}){
    setActualDate(item);
    setIsPopup(false)

  }

  function resetDate() {
    setActualDate(null)
    setIsPopup(false)
  }

  console.log(isPopup)

  const [title, setTitle] = useState<undefined | string>();
  // const [attribute, setAttribute] = useState();
  // const [dateValue, setDateValue] = useState();


  useEffect(() => {
    setAttributesArr(returnAttributes())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes])

  function addArrAttr(item:IAttribute) {
    if(Array.isArray(attributesArr)){
      if(attributesArr.find(itemArr => itemArr.id === item.id)){
        if(attributesArr.length > 1){
        setAttributesArr(prev => prev?.filter(itemArr => itemArr.id !== item.id))

        } else{
          setAttributesArr(undefined)
        }
      } else{
        setAttributesArr(prev => [...prev!, item ])
      }

    } else{
      setAttributesArr([item])
    }

  }

  console.log(attributesArr)

  function returnAttributes() {
    let arrItem: undefined | IAttribute[] = undefined;
    if(Array.isArray(attributesArr) && Array.isArray(attributes)){
      arrItem = attributesArr?.filter(item => item.id === attributes.find(itemA => itemA.id === item.id)?.id);
    }

    if(arrItem?.length === 0){
      arrItem = undefined
    }

    return arrItem
  }
  
  function AddTaskObj() {
    if(title){
      const taskObj: ITaskItem = {
        id: uuidv4(),
        title: title,
        description: '',
      expiredDate: actualDate ? new Date(actualDate.year, actualDate.month, actualDate.day) : null,
      createdDate: new Date(),
      attribute: attributesArr,
      isChecked: false,
  isFavorite: false
  
    }  
    console.log(taskObj)
    dispatch(addTaskItem(taskObj))
    setIsVisible(false)
    }
  }

  console.log(title)
  
  return (
    <>
    
    <div className={styles.AddTaskWrapper}>
      {addAttrVisible ? <AddAttribute setVisible={setAddAttrVisible}/> : '' }
      
    <div className={styles.heading}>
      <h2>Add New Task</h2>
      <button onClick={() => setIsVisible(false)}>
        <img src={CloseSVG} alt="Close" />
      </button>
    </div>
    
    <div className={styles.content}>
      <div  className={styles.inputWrapper}>
        <input defaultValue={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} placeholder='New Task...' type="text" />
        
        <div className={styles.dropDownWrapper}>
        <div id={styles.AttrBtn}>
        <button onClick={() => setAttrVisible(prev => !prev)} className={styles.dropDownBtn}>
          {Array.isArray(attributesArr)  ? <div  className={styles.BtnItem} style={{backgroundColor: `${attributesArr[0].firstColor}`, borderColor: `${attributesArr[0].secondaryColor}`, boxShadow: `0px 1px 3.4px 0px ${attributesArr[0].firstColor}`}}>{attributesArr[0].title}</div> : <h5>None</h5>}
            {/* <div className={styles.BtnItem}>Soon</div> */}
            <img style={{ transform: `rotate(${attrVisible ? '' : '-'}90deg)` }} src={StrelkaSVG} alt="" />
          </button>
          {Array.isArray(attributesArr)  && attributesArr?.length > 1 ? <h3>{`+${attributes.length - 1}`}</h3> : ''}
          {/* <h3>+2</h3> */}
          </div>
          
          {attrVisible ? <div className={styles.DropFlex}>
          <ul className={styles.dropDownItemsWrapper}>
            {/* <li className={styles.dropDownItem}><button>Soon</button></li> */}
            {attributes.map((item) => {
              return <li key={item.id} className={styles.dropDownItem}><button onClick={() => addArrAttr(item)}  style={{backgroundColor: `${item.firstColor}`, borderColor: `${item.secondaryColor}`, boxShadow: `0px 1px 3.4px 0px ${item.firstColor}`}}>{item.title}</button>
              <div onClick={() => dispatch(deleteAttributeItem(item.id))} className={styles.deleteBtn}>
              <img src={DeleteSVG} alt="" />
              </div>
              </li>
            })}
          </ul>
            <button onClick={() => setAddAttrVisible(true)} className={styles.dropDownItemAdd}>Add New</button>  
          </div>  : ''}
        </div>
      </div>
      <div className={styles.DateWrapper}>
        <h3>Expired Date</h3>
        <div className={styles.inputWrapper}>
        <div onClick={() => setIsPopup(true)} className={styles.dateInput}>
          {actualDate ? `${actualDate.day}-${actualDate.month}-${actualDate.year}`: "None"}
          <button>
          <img style={{ transform: `rotate(${!isPopup ? '-' : ''}90deg)` }} src={StrelkaSVG} alt="" />
        </button>
        </div>
       <button onClick={() => resetDate()}>Reset</button>
        {isPopup ? <div className={styles.CalendarDiv}>
        <Calendar isActiveOn = {false} onClickNum = {item => SelectDateFunc(item)}/>
        </div> : ''}
        </div>
      </div>
      <div className={styles.BtnWrapper}>
        <Button onClick={() => AddTaskObj()}/>
      </div>
    </div>
    </div>
    </>
  )
}

export default AddTaskPopup