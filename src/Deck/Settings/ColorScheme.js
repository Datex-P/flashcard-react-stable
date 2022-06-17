import React, {useContext} from 'react'
import '../../styles.scss'
import './settings.css'
import { Context } from '../../Context'

export default function ColorScheme () {

  const { dataBase, setDataBase, user} = useContext(Context)

  async function handleColor(e) {
    console.log(user, 'user in handle color')
    let color = e.target.value
    try{
    await fetch('http://localhost:4000/update_colorscheme', {
   //   mode: 'cors',
      method:'POST',
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers": "X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        // "Access-Control-Allow-Credentials": "true",
        "Content-Type":"application/json",
        "Accept":"application/json"
       // "Access-Control-Max-Age": "2592000"
      },
        body: JSON.stringify({
          color,
          user
        })
      });
       let newDataBase = { ...dataBase }
       newDataBase.userPreferences[e.target.name] = e.target.value
       setDataBase(newDataBase)
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
