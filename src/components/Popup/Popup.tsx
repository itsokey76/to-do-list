import React, { ReactNode } from 'react'

import styles from './popup.module.scss'

const Popup = ({children} : {children: ReactNode}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupWrapper}>
        
      
      {children}
       
        
    </div>
    </div>
   
  )
}

export default Popup