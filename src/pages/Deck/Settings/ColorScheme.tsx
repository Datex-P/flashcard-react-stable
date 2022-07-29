import React, {useContext} from 'react'
import '../../../styles.scss'
import './settings.css'
import { Context } from '../../../context/Context'
import {ColorLogic} from './ColorLogic'

export default function ColorScheme () {

  const {dataBase} = useContext(Context)
  const {handleColor} = ColorLogic()

  return (
   <>
    <div className='settings__colorscheme'>Colorscheme</div>
    <div className='settings__colorscheme-container justify-between-align-center'>
        {
          ['light', 'dark', 'default'].map((comp,index) =>
            <React.Fragment key={index}>
              <input 
                className='cursorPointer'
                name='backgroundColor'
                type='radio'
                title = {`Change background color of main menu to ${comp}.`}
                value={comp}
                checked ={dataBase.userPreferences?.backgroundColor === comp}  //how to combine checked and handleColor accurately?
                onChange={handleColor}
              />
              <label className='mb-0'>
                  {comp}
              </label>
            </React.Fragment>
          )
        }
    </div>
   </>
  )
}
