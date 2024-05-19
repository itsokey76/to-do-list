import React from 'react'

import styles from './FilterList.module.scss'

// import CloseSVG from './imgs/Close.svg'
import FilterListItem from './FilterListItem/FilterListItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setCheckeked, setFavorite, setSort } from '../../redux/slices/filterSlice'


const FilterList = () => {

  const { isChecked, isFavorite, sortBy} = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch()

  function renderLists() {
    let listsArr: {
      text: string,
      onClose: () => void
    }[] = [];

    if(isChecked){
      listsArr = [...listsArr, {
        text: 'Checked',
        onClose: () => dispatch(setCheckeked(false))
      }]
    }
    if(isFavorite){
      listsArr = [...listsArr, {
        text: 'Favorite',
        onClose: () => dispatch(setFavorite(false))
      }]
    }
    if(sortBy !== 'newest'){
      listsArr = [...listsArr, {
        text: sortBy,
        onClose: () => dispatch(setSort('newest'))
      }]
    }

    return listsArr
  }

  
  return (
    <div className={styles.FilterListsWrapper}>
                <div id={styles.FlterListBG_1} className={styles.FlterListBG}></div>
                <div className={styles.filterListItems}>
                  {
                   renderLists().map(item => {
                    return <FilterListItem title = {item.text} onClose = {item.onClose} />
                
                   })
                  }
                
                </div>
                <div id={styles.FlterListBG_2} className={styles.FlterListBG}></div>
              </div>
  )
}

export default FilterList