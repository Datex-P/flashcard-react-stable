import React, { useContext,useRef, } from "react";
import { Context } from "../Context"; 

export default function Button ({ok=false, 
  setInputField, 
  setHideCreateDeckBtn,
 // addNewDeckName,
  setArrowDown,
  closeHandler}) {

  const {
    dataBase, 
    setDecksAreVisible, 
  } = useContext(Context);


  const okRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  function cancelHandler () {
    closeHandler();
    setInputField('');
    setHideCreateDeckBtn(false)
  
    if (dataBase.DeckNames.length === 0) {     
        setArrowDown(true);
        setDecksAreVisible(false); 
    }
  }

  return (
      ok? (
      <button
        className='okCancelButtonColor okCancelButton'
        key={'Ok'}
        ref={okRef}
        onClick={()=>setHideCreateDeckBtn(false)}
      //  onClick={addNewDeckName}
      >
        Ok
      </button>
      )
      :
      ( 
      <button
        className='okCancelButtonColor okCancelButton'
        key={'Cancel'}
        ref={cancelRef}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      )
  )
}