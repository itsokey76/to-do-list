import React from 'react'
import styles from './Button.module.scss'
const Button = ({onClick, title = 'Add Task'}: {
  onClick: () => void;
  title?: string
}) => {

  
  return (
    <button onClick={() => onClick()} className={styles.addBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
  <path d="M6.6 23C4.76 23 3.2 22.3867 1.92 21.16C0.64 19.9333 0 18.4383 0 16.675V4.6C0 3.335 0.47 2.25208 1.41 1.35125C2.35 0.450416 3.48 0 4.8 0C6.12 0 7.25 0.450416 8.19 1.35125C9.13 2.25208 9.6 3.335 9.6 4.6V13.8H7.8V4.6C7.8 3.795 7.51 3.11458 6.93 2.55875C6.35 2.00292 5.64 1.725 4.8 1.725C3.96 1.725 3.25 2.00292 2.67 2.55875C2.09 3.11458 1.8 3.795 1.8 4.6V16.675C1.8 17.94 2.27 19.0229 3.21 19.9237C4.15 20.8246 5.28 21.275 6.6 21.275C7.18 21.275 7.7252 21.1838 8.2356 21.0013C8.7452 20.8196 9.2 20.5658 9.6 20.24V22.31C9.14 22.5208 8.66 22.6883 8.16 22.8125C7.66 22.9375 7.14 23 6.6 23ZM12 18.4H9.6C9.26 18.4 8.9752 18.2896 8.7456 18.0688C8.5152 17.8488 8.4 17.5758 8.4 17.25C8.4 16.9242 8.5152 16.6512 8.7456 16.4312C8.9752 16.2104 9.26 16.1 9.6 16.1H12V13.8C12 13.4742 12.1152 13.2008 12.3456 12.98C12.5752 12.76 12.86 12.65 13.2 12.65C13.54 12.65 13.8248 12.76 14.0544 12.98C14.2848 13.2008 14.4 13.4742 14.4 13.8V16.1H16.8C17.14 16.1 17.4248 16.2104 17.6544 16.4312C17.8848 16.6512 18 16.9242 18 17.25C18 17.5758 17.8848 17.8488 17.6544 18.0688C17.4248 18.2896 17.14 18.4 16.8 18.4H14.4V20.7C14.4 21.0258 14.2848 21.2988 14.0544 21.5188C13.8248 21.7396 13.54 21.85 13.2 21.85C12.86 21.85 12.5752 21.7396 12.3456 21.5188C12.1152 21.2988 12 21.0258 12 20.7V18.4ZM6.6 16.675V18.4C5.76 18.4 5.05 18.1221 4.47 17.5662C3.89 17.0104 3.6 16.33 3.6 15.525V5.4625C3.6 5.21333 3.6852 5.00748 3.8556 4.84495C4.0252 4.68165 4.24 4.6 4.5 4.6C4.76 4.6 4.9752 4.68165 5.1456 4.84495C5.3152 5.00748 5.4 5.21333 5.4 5.4625V15.525C5.4 15.8508 5.5152 16.1238 5.7456 16.3438C5.9752 16.5646 6.26 16.675 6.6 16.675ZM11.4 10.35V5.4625C11.4 5.21333 11.4852 5.00748 11.6556 4.84495C11.8252 4.68165 12.04 4.6 12.3 4.6C12.56 4.6 12.7752 4.68165 12.9456 4.84495C13.1152 5.00748 13.2 5.21333 13.2 5.4625V10.35H11.4Z" fill="white"/>
</svg>
{title}
          </button>
  )
}

export default Button