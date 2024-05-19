import React, { useEffect, useRef, useState } from 'react';


import styles from './TaskItem.module.scss';
import { ITaskItem, changeIsChecked, changeIsFavorite, fixTaskItemAttributes, setDeletingTaskID, setManagerTaskID } from '../../redux/slices/taskItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IAttribute } from '../../redux/slices/attributesSlice';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const TaskItem = ({item,  setIsDeleteTaskVisible,setIsFolderManagerVisible}: {
  item: ITaskItem,
  setIsDeleteTaskVisible: (i: boolean) => void,
  setIsFolderManagerVisible: (i: boolean) => void
}) => {
  const {id, title, description, expiredDate, attribute, isChecked, isFavorite } = item
  // {id, title, description, expiredDate, attribute, createdDate, isChecked, isFavorite }
  const attributesSelect = useSelector((item: RootState) => item.attributes.attributes)


  const [eventClick, setEventClick] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null);
const [isVisible, setIsVisible] = useState(false)
const PopupElement = useRef<null | HTMLDivElement>(null)
const DivElement = useRef<null | HTMLDivElement>(null)




 

const dispatch =useDispatch()
  useEffect(() => {
    dispatch(fixTaskItemAttributes({
      id,
      attr: fixAttributes()
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributesSelect])
  function fixAttributes() {
    let arrItem: undefined | IAttribute[] = undefined;
    if(Array.isArray(attribute) && Array.isArray(attributesSelect)){
      arrItem = attribute?.filter(item => item.id === attributesSelect.find(itemA => itemA.id === item.id)?.id);
    }

    if(arrItem?.length === 0){
      arrItem = undefined
    }

    return arrItem
  }

  function Desr() {
    let str: string  | undefined = ''
    if(description){
      if(description.length > 18){
        str = str.slice(0, 19)
      }
    } else {
      str = undefined
    }

    return str
  }

  function OnClickContext(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    e.preventDefault()
    setEventClick(e)
    setIsVisible(true)
  }

  function HandleClick(e: MouseEvent) {
    if(PopupElement.current && e.target !== PopupElement.current){
      setIsVisible(false)
      setEventClick(null)
    }
    // console.log(PopupElement.current, e.target !== PopupElement.current)
  }


  useEffect(() => {
    window.addEventListener('click', (e) => HandleClick(e))
    // window.addEventListener('contextmenu', (e) => HandleContextMenu(e))
  
  
    return () => {
      window.removeEventListener('click', HandleClick)
      // window.removeEventListener('click', HandleContextMenu)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setDel() {
    setIsDeleteTaskVisible(true);
    dispatch(setDeletingTaskID(id))
  }

  const expDate = () => {
    const currTime = new Date();
    if(expiredDate){
      const time = expiredDate.getTime()  - currTime.getTime()

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / (1000 * 60)) % 24);

      return {
        days,
        hours,
        minutes
      }
    }

    return undefined
  }

  const descStr = Desr()

const navigate = useNavigate()
  function toTaskEdit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if(e.target instanceof Element){
        if(e.target.className === styles.TaskWrap){
          navigate(`/task/${id}`)
        }
      }
  }

  function openFolderManager() {
    setIsFolderManagerVisible(true);
    dispatch(setManagerTaskID(id))
  }
  return (
    <div onClick={(e) => toTaskEdit(e)} ref={DivElement} onContextMenu={(e) => OnClickContext(e)} className={styles.TaskItem}>
      <div className={styles.TaskWrap}>


      <div className={styles.TaskHeadingWrapper}>
        <div className={styles.TaskItemHeading}>
          <h2>{title}</h2>
          <button onClick={() => dispatch(changeIsFavorite(id))}>
            {!isFavorite ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
  <path d="M12.75 3.85714L9.73833 9.56631L3 10.4763L7.875 14.918L6.72667 21.1905L12.75 18.233L18.7733 21.1905L17.625 14.918L22.5 10.4763L15.7617 9.56631L12.75 3.85714Z" stroke="#84849D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
  <path d="M12.75 3.85714L9.73833 9.56631L3 10.4763L7.875 14.918L6.72667 21.1905L12.75 18.233L18.7733 21.1905L17.625 14.918L22.5 10.4763L15.7617 9.56631L12.75 3.85714Z" fill="#84849D" stroke="#84849D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}
          
          </button>
        </div>
        <div className={styles.TaskItemDesc}>
          <div className={styles.TaskItemDescText}>{descStr ? descStr : <span>{`[No Decription...]`}</span>}</div>
        </div>
      </div>
      <div className={styles.TaskBtnWrapper}>
        <button onClick={() => dispatch(changeIsChecked(id))}>
          {isChecked ? <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
          >
            <rect width="46" height="46" rx="5" fill="#7046F8" />
            <path
              d="M19.7498 27.55L15.1998 23L13.6831 24.5167L19.7498 30.5833L32.7498 17.5833L31.2331 16.0667L19.7498 27.55Z"
              fill="white"
            />
          </svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
  <rect width="46" height="46" rx="5" fill="#272D38"/>
  <rect x="2" y="2" width="42" height="42" rx="5" fill="#1C2029"/>
</svg>}
          
         
        </button>
      </div>
      </div>
      <div className={styles.TaskDown}>
        <div className={styles.AtrributeWrapper}>
          {attribute?.map(item => {
          return <div style={{backgroundColor: item.firstColor, borderColor: item.secondaryColor, boxShadow: `0px 1px 3.4px 0px ${item.firstColor}`}} className={styles.AttributeItem}>{item.title}</div>
        }
          )}
        </div>
        <div className={styles.TaskItemDates}>
            <div className={styles.expDate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6.7 8.2L5.2 6.7M17.3 8.2L18.8 6.7M12 6C10.5166 6 9.0666 6.43987 7.83323 7.26398C6.59986 8.08809 5.63856 9.25943 5.07091 10.6299C4.50325 12.0003 4.35472 13.5083 4.64411 14.9632C4.9335 16.418 5.64781 17.7544 6.6967 18.8033C7.7456 19.8522 9.08197 20.5665 10.5368 20.8559C11.9917 21.1453 13.4997 20.9968 14.8701 20.4291C16.2406 19.8614 17.4119 18.9001 18.236 17.6668C19.0601 16.4334 19.5 14.9834 19.5 13.5C19.5 11.5109 18.7098 9.60322 17.3033 8.1967C15.8968 6.79018 13.9891 6 12 6ZM12 6V3M15 3H9M10 14H12V10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              <span>{expDate() ? <><span style={{display: expDate()!.days === 0 ? 'none' : 'inline-block'}}>{expDate()?.days}d.</span><span style={{display: expDate()!.hours === 0 ? 'none' : 'inline-block'}}>{expDate()?.hours}h.</span><span style={{display: expDate()!.minutes === 0 ? 'none' : 'inline-block'}}>{expDate()?.minutes}m.</span></> : 'ss'}</span></div>
          </div>
      </div>
      {/* ref={PopupElement} style={{left: `${eventClick.pageX}px`, top: `${15}px`}} */}
      {/* onClick={() => deleteFolder()} */}
      {isVisible && eventClick ? <div ref={PopupElement}  style={{left: `${eventClick.pageX - 350}px`, top: `${40}px`}}  className={styles.FolderPopup}>
          <div  onClick={() => setDel()} className={styles.popupItem}>Delete</div>
          <div onClick={() =>  navigate(`/task/${id}`)} className={styles.popupItem}>Edit</div>
          <div onClick = {() => openFolderManager()} className={styles.popupItem}>Add To Folder</div>
        </div> 
     : ''}
     </div>
  );
};

export default TaskItem;
