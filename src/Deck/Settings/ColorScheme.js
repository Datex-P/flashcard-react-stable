import React, {useContext} from 'react'
import '../../styles.css'
import './settings.css'
import { Context } from '../../Context'

export default function ColorScheme () {

  const { dataBase, setDataBase} = useContext(Context)


  function handleColor(e) {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences[e.target.name] = e.target.value
    setDataBase(newDataBase)
  }


  return (
   <>
    <div className='settings__colorscheme'>Colorscheme</div>
      <div className='settings__colorscheme-container justify-between-align-center border border-dark'
      >
        {
          ['light', 'dark', 'default'].map((comp,index) =>
            <React.Fragment key={index}>
              <input 
                style={{ cursor: 'pointer' }}
                name='backgroundColor'
                type='radio'
                // title = `Change background color of main menu to ${comp}.`
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