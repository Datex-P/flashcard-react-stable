/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useContext } from 'react'
import { Context } from '../../../Context';


export default function DeckOrCardName({ data: {
  bg,
  editButtonClicked,
  input,
  name,
  setDeckNameLengthRight,
  setThreeDotsMenuOpen,
  setNameTooLongOrShort
} }) {

  const {
    dataBase, setDataBase, 
    setThreeDotsOpen, 
    nameOfTopDeck,setNameOfTopDeck,
    setStopRedCrossListener
  } = useContext(Context);

  function handleChangeName(e) {
   
    if (e.target.value.length > 3 && e.target.value.length < 12) {
      setDeckNameLengthRight(true)
      setThreeDotsMenuOpen(true)
      setNameTooLongOrShort(false)
      setThreeDotsOpen(true)
    } else {
      setNameTooLongOrShort(true)
      setDeckNameLengthRight(false)
    }

    let newDataBase = {...dataBase}
    let index = newDataBase.DeckNames.findIndex(x=> x.name === name)
    newDataBase.DeckNames[index].name = e.target.value
    setDataBase(newDataBase)
    setNameOfTopDeck(e.target.value);
  }

  useEffect(() => {
    if(!editButtonClicked) {
      setStopRedCrossListener(true)
    }
  }, [editButtonClicked])


  return (
    <>
      {editButtonClicked ?
        (
          <div
            className='deck__deckOrCardName justify-center posRelative'
            style={{ background: bg }}
          >
            {name}
          </div>
        ) : (
          <input
            ref={input}
            className='deck__addToDeckInput'
            value={nameOfTopDeck}
            onChange={handleChangeName}
          />
        )
      }
    </>
  )
}
