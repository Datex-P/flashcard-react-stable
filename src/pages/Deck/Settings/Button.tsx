import React from "react";
import {ButtonLogic} from './ButtonLogic'


function Button ({setDeleteAccountPrompt, ok=false}) {

const {deleteHandler, cancelHandler} = ButtonLogic({setDeleteAccountPrompt})

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