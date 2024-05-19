import React from 'react'
import CloseSVG from '../../../imgs/Close.svg'

import styles from './FilterListItem.module.scss'

const FilterListItem = ({title, onClose}: {
  title: string,
  onClose: () => void

}) => {
  return (
    <div className={styles.filterListItem}>
                  <p>{title}</p>
                  <button onClick={() => onClose()}>
                  <img src={CloseSVG} alt="" />
                  </button>
                  </div>
  )
}

export default FilterListItem