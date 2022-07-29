import { useContext } from "react";
import { Context } from '../../../context/Context'; 
import { useHistory } from "react-router-dom";



export const ButtonLogic = ({setDeleteAccountPrompt}) => {


const {apiURL, email} = useContext(Context);
let history = useHistory();


  function cancelHandler () {
    setDeleteAccountPrompt(false)
  }

  async function deleteHandler() {
    console.log(email, 'email here')
    const response = await fetch(`${apiURL}/delete_account`, {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email:email})
  })
   const data =  await response.json()
   console.log(data, 'data here')
    if(response.status === 200) {
      history.push('/login')
    }
  }
  return {
    cancelHandler, deleteHandler
  }
}