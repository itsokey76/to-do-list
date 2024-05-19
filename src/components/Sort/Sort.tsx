import React, { useEffect, useState } from 'react';

import SortSVG from '../../imgs/Sort.svg'

import styles from './Sort.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IFilters, setCheckeked, setDate, setFavorite, setSort } from '../../redux/slices/filterSlice';
import Calendar from '../Calendar/Calendar';

const sortings: IFilters["sortBy"][] = ['newest' , 'oldest' , 'dateUp' , 'dateDown']
export interface IDateItem {year: number, month: number, day: number}
const Sort = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [localSort, setLocalSort] = useState(0)


  const [firstDate, setFirstDate] = useState<undefined | IDateItem>(undefined);
  const [secondDate, setSecondDate] = useState<undefined | IDateItem>(undefined);
  const [isFirstVisible, setIsFirstVisible] = useState(false)
  const [isSecondVisible, setIsSecondVisible] = useState(false)


  const dispatch = useDispatch();

  function changeSecondDate(item: {year: number, month: number, day: number} | undefined){
    setSecondDate(item);
    // setIsSecondVisible(prev => !prev)
  }

  function changeFirstDate(item: {year: number, month: number, day: number} | undefined){
    setFirstDate(item);
    // setIsFirstVisible(prev => !prev)
  }

  console.log(firstDate, secondDate)

  useEffect(()=> {
    dispatch(setDate({firstDate, secondDate}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDate, secondDate])
  

  function changeLocalSort() {
    if(localSort === sortings.length - 1){
      setLocalSort(0)
      dispatch(setSort(sortings[0]))
    } else {
      setLocalSort(prev => prev + 1)
      dispatch(setSort(sortings[localSort + 1]))
    }

  } 

  function getZero(index:number) {
    if(index < 10){
      return `0${index}`
    }

    return index
  }

  const {isChecked, isFavorite} = useSelector((item: RootState) => item.filters)
  return <div className={styles.sortWrapper}>
    <button onClick={() => setIsVisible(!isVisible)} className={styles.sortBtn}>
  <img src={SortSVG} alt="" />
  <h3>Sort</h3>
</button>
{isVisible ? 
<div className={styles.sortPopup}>
<h2>Sorting</h2>
<div className={styles.SortChecking}>
  <h3>Sort By</h3>
  <div onClick={() => changeLocalSort()} className={styles.CheckOption}>{sortings[localSort]}</div>
</div>
<div className={styles.SortChecking}>
  <h3>Checked</h3>
  <button onClick={() => dispatch(setCheckeked(!isChecked))}>
    {isChecked ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="5" fill="#7046F8"/>
  <path d="M13.7388 19.1652L10.5736 16L9.51855 17.0551L13.7388 21.2754L22.7823 12.2319L21.7273 11.1768L13.7388 19.1652Z" fill="white"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="5" fill="#272D38"/>
  <rect x="2" y="2" width="28" height="28" rx="5" fill="#1C2029"/>
</svg>}
  
   
  </button>
</div>
<div className={styles.SortChecking}>
  <h3>Favorite</h3>
  <button onClick={() => dispatch(setFavorite(!isFavorite))}>
  {isFavorite ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="5" fill="#7046F8"/>
  <path d="M13.7388 19.1652L10.5736 16L9.51855 17.0551L13.7388 21.2754L22.7823 12.2319L21.7273 11.1768L13.7388 19.1652Z" fill="white"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="5" fill="#272D38"/>
  <rect x="2" y="2" width="28" height="28" rx="5" fill="#1C2029"/>
</svg>}
  </button>
</div>
<h4>Date</h4>
<div className={styles.inputsWrapper}>
<div  className={styles.inputWrappper}><div onClick={() => setIsFirstVisible(prev => !prev)} className={styles.SortDate} >{firstDate ? `${firstDate.year.toString().slice(2, 4)}.${getZero(firstDate.month)}.${getZero(firstDate.day)}`: 'Od..'}
{isFirstVisible ? <div className={styles.calendarWrapper}>
  <Calendar isActiveOn activeNum={firstDate} onClickNum={(item) => changeFirstDate(item)}/>
</div> : ''}</div>
<button onClick={() => changeFirstDate(undefined)} >reset</button>
</div>
<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
  <path d="M4.5 15.75H22.5L19.125 19.125" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22.5 11.25H4.5L7.875 7.875" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<div  className={styles.inputWrappper}><div onClick={() => setIsSecondVisible(prev => !prev)} className={styles.SortDate} >{secondDate ? `${secondDate.year.toString().slice(2, 4)}.${getZero(secondDate.month)}.${getZero(secondDate.day)}`: 'Od..'}
{isSecondVisible ? <div className={styles.calendarWrapper}>
  <Calendar isActiveOn activeNum={secondDate} onClickNum={(item) => changeSecondDate(item)}/>
</div> : ''}</div>
<button onClick={() => changeSecondDate(undefined)}>reset</button>

</div>
</div>
</div> : ''}
  </div>
};

export default Sort;
