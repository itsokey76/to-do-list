import React, { useState } from 'react'

import styles from './AddAttribute.module.scss'

import PlusSVG from '../../imgs/Plus.svg'
import CloseSVG from '../../imgs/Close.svg'
import { IAttribute, addAttributeItem } from '../../redux/slices/attributesSlice';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';


const colorsArray = [
  { firstColor: "#FF5733", secondaryColor: "#FF8C66" }, // оранжевый
  { firstColor: "#33FF57", secondaryColor: "#80FFA0" }, // зеленый
  { firstColor: "#3366FF", secondaryColor: "#80A0FF" }, // синий
  { firstColor: "#FF33E6", secondaryColor: "#FF80FF" }, // фиолетовый
  { firstColor: "#FFFF33", secondaryColor: "#FFFF80" }, // желтый
  { firstColor: "#33FFFF", secondaryColor: "#80FFFF" }, // голубой
  { firstColor: "#FF3333", secondaryColor: "#FF8080" }, // красный
  { firstColor: "#FF8533", secondaryColor: "#FFAD80" }, // оранжево-желтый
  { firstColor: "#FF33B8", secondaryColor: "#FF80D4" }, // розовый
  { firstColor: "#8A33FF", secondaryColor: "#B580FF" }, // фиолетово-синий
  { firstColor: "#FFE633", secondaryColor: "#FFFF80" }, // ярко-желтый
  { firstColor: "#33FFD9", secondaryColor: "#80FFE6" }, // бирюзовый
  { firstColor: "#33FF5E", secondaryColor: "#80FFA0" }, // зеленоватый
  { firstColor: "#FF3389", secondaryColor: "#FF80AD" }  // пурпурный
];


const AddAttribute = ({setVisible} :{
  setVisible: (item: boolean) => void;

} )  => {

  const [activeColor, setActiveColor] = useState(0);
  const [activeTitle, setActiveTitle] = useState('');

  const dispatch = useDispatch()

  function setTitle(str: string) {
    if(str.length <= 8){
      setActiveTitle(str)
    }
  }

  function AddAttrItem() {
    if(activeTitle){
      const attrItem:  IAttribute = {
        id: uuidv4(),
        title: activeTitle,
        firstColor: colorsArray[activeColor].firstColor,
        secondaryColor: colorsArray[activeColor].secondaryColor,
      }

      dispatch(addAttributeItem(attrItem))
      setActiveTitle('');
    }
  }
  return (
    <div className={styles.AddAttributeWrapper}>
      <div className={styles.heading}>
      <h2>Add Attribute</h2>
      <button onClick={() => setVisible(false)}>
        <img src={CloseSVG} alt="Close" />
      </button>
    </div>
      <div className={styles.centerContent}>
        <input defaultValue={activeTitle} onChange={e => setTitle(e.target.value)} type="text" />
        <ul className={styles.colorItems}>
          {colorsArray.map((item, i) => {
            return <li onClick={() => setActiveColor(i)} style={{backgroundColor: `${item.firstColor}`, borderColor: `${item.secondaryColor}`}} className={styles.colorItems}></li>
          })}
        </ul>
        <div style={{backgroundColor: `${colorsArray[activeColor].firstColor}`, borderColor: `${colorsArray[activeColor].secondaryColor}`, boxShadow: ` 0px 1px 3.4px 0px ${colorsArray[activeColor].firstColor}`}} className={styles.AttributeItem}>{!activeTitle ? 'None' : activeTitle}</div>
          <button onClick={() => AddAttrItem()} className={styles.AddAttrBtn}>
          <img src={PlusSVG} alt="Plus" />
          Add Attribute
          </button>
      </div>
      </div>
  )
}

export default AddAttribute