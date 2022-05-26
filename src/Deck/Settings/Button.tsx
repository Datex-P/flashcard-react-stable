import React, { useContext } from "react";
import { Context } from "../../Context"; 
import { useHistory } from "react-router-dom";


function Button ({setDeleteAccountPrompt, ok=false}) {

const {dataBase} = useContext(Context);
let history = useHistory();


  function cancelHandler () {
    setDeleteAccountPrompt(false)
  }

  function okHandler () {
    history.push('/login')
    //delete account in database still to do
  }

  return (
      ok? (
      <button
        className='settings__button'
        key={'Ok'}
        onClick={okHandler}
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