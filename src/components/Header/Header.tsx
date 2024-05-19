import React, { useState } from 'react'

import settingsImg from '../../imgs/settings.svg'

import styles from './Header.module.scss'

const Header = () => {

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className={styles.topGeneral}>
          <div style={{opacity: 0}} className={styles.linkPath}>/all/nigga</div>
          <div className={styles.settingsDiv}>
          <button className={styles.settingsBtn}>
            <img src={settingsImg} alt="settings" />
          </button>
          <button onClick={() => setTheme((prev) => {
            if(prev === 'dark'){
              return 'light'
            }  else{
              return 'dark'
            }
          })} className={`${styles.themeBtn} ${theme === 'dark' ? '' : 'active' }`}>
            <div className={styles.themeBG}>
              <div></div>
            </div>
          </button>
          </div>
        </div>
  )
}

export default Header