import React, { useContext } from "react";
import { Context } from "../Context"; 

export default function Button ({ok=false, 
  setInputField, 
  setHideCreateDeckBtn,
  addNewDeckName,
  setNameTooShortOrLong,
  setArrowDown,
  closeHandler}) {

  const {dataBase, 
  } = useContext(Context);


  // const okRef = useRef<HTMLButtonElement>(null)
  // const cancelRef = useRef<HTMLButtonElement>(null)

  function cancelHandler () {
    closeHandler();
    setInputField('');
    setHideCreateDeckBtn(false)
    setNameTooShortOrLong(false)
  
    if (dataBase?.DeckNames?.length === 0) {     
        setArrowDown(true);
        // setDecksAreVisible(false); 
    }
  }

  function okHandler(){
    setHideCreateDeckBtn(false)
    setNameTooShortOrLong(false)
    addNewDeckName()
    closeHandler()
  }

  return (
      ok? (
      <button
        className='landing__okCancelButton'
        key={'Ok'}
        // ref={okRef}
        onClick={okHandler}
      >
        Ok
      </button>
      )
      :
      ( 
      <button
        className='landing__okCancelButton'
        key={'Cancel'}
        // ref={cancelRef}
        onClick={cancelHandler}
      >
        Cancel
      </button>
      )
  )
}