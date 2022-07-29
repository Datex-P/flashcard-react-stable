import React, {useContext} from 'react'
import '../../../styles.scss'
import './settings.css'
import { Context } from '../../../context/Context'

export default function ColorScheme () {

  const { apiURL, email, dataBase, setDataBase} = useContext(Context)

  async function handleColor(e: { target: { value: any; name: string | number } }) {
    let color = e.target.value
    try{
      await fetch(`${apiURL}/update_colorscheme`, {
        method:'POST',
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
          body: JSON.stringify({
            color:color,
            email:email
          })
        });
       let newDataBase = { ...dataBase }
       newDataBase.userPreferences[e.target.name] = e.target.value
       setDataBase(newDataBase)
       //better to store color in localstorage
    } catch (err){
      console.log(err, 'err here')
    }
  }

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
