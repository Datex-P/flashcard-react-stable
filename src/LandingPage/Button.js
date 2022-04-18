import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../Context"; 

export default function Button ({ok=false, setInputField, addNewDeckName, close}) {

  const {
    addNewDeckWindow, 
    setActive, 
    setArrowDown, 
    colors, //colors array for the decks
    dataBase, setDataBase, 
    setDecksAreVisible,
    setScrollbarVisible,
    setShowProgressDiagram, 
  } = useContext(Context);


  const okRef = useRef()
  const cancelRef = useRef()

  function cancelHandler() {
    (() => {
      close();
      setInputField("");

      if (dataBase.DeckNames.length === 0) {
      
        setArrowDown(true);
        setDecksAreVisible(false);

      }
    })()
  }

  function okHandler () {
    addNewDeckName()
  }

  return (

      <button
        className="okCancelButtonColor okCancelButton"
        key={ok? 'Ok':'Cancel'}
        ref={ok? okRef: cancelRef}
        onClick={() => {
          ok?
            okHandler()
            :
            (() => {
              cancelHandler()
            })()
        }}
      >
        {ok? 'OK':'Cancel'}
      </button>
  )
}