import React, {useContext} from 'react'
import { Button} from "react-bootstrap";
import { Context } from '../../../../context/Context';
import {OpenLogic} from './OpenLogic'

export default function OpenDeckBtn ({
  data, 
  paused, 
  generateRandom,
  setScrollbarVisible
}) {

  const {editButtonClicked} = useContext(Context);

  const {openDeckHandler} = OpenLogic({
    paused, 
    generateRandom,
    setScrollbarVisible})

  // let styleHandler = { 
  //   backgroundColor: 'rgb(108, 117, 125)',
  //   pointerEvents: editButtonClicked? 'auto':'none',
  //   cursor: paused || data.length === 0 || editButtonClicked ? 'pointer': 'default',
  //   opacity: paused || data.length === 0 ? '0' : '1' //open deck button is not visible when length is zero
  //   }

  return (
   
    <Button
      variant='secondary'
      className='deck__openDeck mt-22px'
      size='sm'
      onClick={openDeckHandler}
      title='Click to open this deck'
      style={{ backgroundColor: 'rgb(108, 117, 125)',
      pointerEvents: editButtonClicked? 'auto':'none',
      cursor: paused || data.length === 0 || editButtonClicked ? 'pointer': 'default',
      opacity: paused || data.length === 0 ? '0' : '1' //open deck button is not visible when length is zero
    }}
    >
      Open Deck
  </Button>
  )
}

