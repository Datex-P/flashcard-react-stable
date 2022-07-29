import {useContext} from 'react'
import { Context } from '../../../context/Context'

export const ColorLogic = () => {

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
  return {handleColor}
}