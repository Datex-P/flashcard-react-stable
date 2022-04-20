import React, { useContext,useRef, } from "react";
import { Context } from "../Context"; 

export default function Button ({ok=false, setInputField, addNewDeckName, close}) {

  const {
    setArrowDown, 
    dataBase, 
    setDecksAreVisible, 
  } = useContext(Context);


  const okRef = useRef()
  const cancelRef = useRef()

  function cancelHandler () {
    close();
    setInputField('');
  
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
        onClick={addNewDeckName()}
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