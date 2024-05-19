import React, { useCallback, useState } from 'react'

import styles from './Calendar.module.scss'

import StrelkaSVG from '../../imgs/Strelka.svg'


const Calendar = ({onClickNum, isActiveOn = false, activeNum = undefined}: {
  isActiveOn?: boolean;
  onClickNum: (date: {year: number, month: number, day: number}) => void;
  activeNum?: {year: number, month: number, day: number} | undefined;
}) => {


  // const actualDate = new Date()

  // type DateType = {
  //   getFullYear: number,
  //   getMonth: number
  // }

  // const [date, setDate] = useState<DateType>({
  //   getFullYear: actualDate.getFullYear(),
  //   getMonth: actualDate.getMonth()
  // })

  const [date, setDate] = useState({
    year: 2024,
    monthIndex: 3
  })

  // const [year, setYear] = useState(2024);
  // const [monthIndex, setMonthIndex] = useState(3);
  const weekDays = ['san', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

interface IMonthDay {
monthName: string;
monthDaysCount: number
}




const MonthsFunc = useCallback((year: number): IMonthDay[] =>{
  console.log('componnent mount')
  const months: IMonthDay[] =  [
    { monthName: 'January', monthDaysCount: 31 },
    { monthName: 'February', monthDaysCount: 28 },
    { monthName: 'March', monthDaysCount: 31 },
    { monthName: 'April', monthDaysCount: 30 },
    { monthName: 'May', monthDaysCount: 31 },
    { monthName: 'June', monthDaysCount: 30 },
    { monthName: 'July', monthDaysCount: 31 },
    { monthName: 'August', monthDaysCount: 31 },
    { monthName: 'September', monthDaysCount: 30 },
    { monthName: 'October', monthDaysCount: 31 },
    { monthName: 'November', monthDaysCount: 30 },
    { monthName: 'December', monthDaysCount: 31 }
];

if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){
  months[1].monthDaysCount = 29
}




return months
}, [])
// const Months = MonthsFunc(year);
  

console.log(date)
function changeMonth(index:number) {
  if(index === 1){
    if(date.monthIndex === 11){
      setDate({
        year: date.year + 1,
        monthIndex: 0
      })
    }else{
      setDate({
        year: date.year ,
        monthIndex: date.monthIndex + 1
      })
    }
  } else if(index === -1){
    if(date.monthIndex === 0){
      setDate({
        year: date.year - 1,
        monthIndex: 11
      })
    }else{
      setDate({
        year: date.year ,
        monthIndex: date.monthIndex - 1
      })
    }
    
  } 
}

function onClickWrap(index: number) {
  onClickNum({
    year: date.year,
    month: date.monthIndex,
    day: index + 1
  });
}


  console.log(date.year)
  return (
    <div className={styles.callendar}>
              <div className={styles.mothAndYear}>
              <button onClick={() => changeMonth(-1)}>
                <img src={StrelkaSVG} alt="" />
                </button>
                
                <h3>{`${MonthsFunc(date.year)[date.monthIndex].monthName} ${date.year}`}</h3>
                <button onClick={() => changeMonth(1)} style={{ transform: 'rotate(90deg)' }}>
                <img src={StrelkaSVG} alt="" />
                </button>
              </div>
              <div className={styles.weekDays}>
                {weekDays.map((item, i) => {
                  return <div className={styles.weekDayItem} key={i}>{item}</div>
                })}
              </div>
              <div className={styles.monthDays}>
                {[...new Array(MonthsFunc(date.year)[date.monthIndex].monthDaysCount)].map((_item, i) => {
                  return <button className={`${styles.monthDayItem} ${isActiveOn && activeNum?.day === i + 1 && activeNum?.month ===  date.monthIndex && activeNum?.year ===  date.year? `${styles.active}` : ''}`} onClick={() => onClickWrap(i)} key={i}>{i + 1}</button>
                })}
              </div>
            </div>
  )
}

export default Calendar