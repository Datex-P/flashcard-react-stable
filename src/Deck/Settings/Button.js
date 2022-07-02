import React, { useContext } from "react";
import { Context } from "../../Context"; 
import { useHistory } from "react-router-dom";


function Button ({setDeleteAccountPrompt, ok=false}) {

const {apiURL, email} = useContext(Context);
let history = useHistory();

  function cancelHandler () {
    setDeleteAccountPrompt(false)
  }

  async function deleteHandler() {
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

  return (
      ok? (
      <button
        className='settings__button'
        key={'Ok'}
        onClick={deleteHandler}
      >
        Ok
      </button>
      )
      :
      ( 
      <button
        className='settings__button'
        key={'Cancel'}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      )
  )
}

export default Button