/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useContext } from 'react'
import { Context } from '../../../../context/Context';
import {DeckOrCardLogic} from './DeckOrCardLogic'

export default function DeckOrCardName({ data: {
  bg,
  editButtonClicked,
  input,
  name,
  setDeckNameLengthRight,
  setThreeDotsMenuOpen,
  setNameTooLongOrShort
} }) {

  const {nameOfTopDeck} = useContext(Context);

  const {handleChangeName} = DeckOrCardLogic({
    editButtonClicked,
    name,
    setDeckNameLengthRight,
    setThreeDotsMenuOpen,
    setNameTooLongOrShort
  })

  return (
    <>
      {editButtonClicked ?
        (
          <div
            className='deck__deckOrCardName justify-center posRelative'
            style={{background:bg}}
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
