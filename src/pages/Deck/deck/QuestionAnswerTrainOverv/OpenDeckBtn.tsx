import React, {useContext} from 'react'
import { Button} from "react-bootstrap";
import { Context } from '../../../../context/Context';

export default function OpenDeckBtn ({
  data, 
  paused, 
  generateRandom,
  setScrollbarVisible
}) {

  const {
    dataBase, setDataBase, 
    editButtonClicked, 
    setHideCreateDeckBtn,
    setThreeDotsOpen,
    setShowProgressDiagram //progressDiagram is shown in the back of main 
  } = useContext(Context);

  function openDeckHandler () {
    if (editButtonClicked && !paused) {
      generateRandom();
      setThreeDotsOpen(false)
      let newDataBase = { ...dataBase };
      newDataBase.openedToday = true; //important for stats
      setShowProgressDiagram(false); //progress diagram gets why not at this place??
      setDataBase(newDataBase);
      setScrollbarVisible(false) //as long as deck is open, scrollbar is not visible
      setHideCreateDeckBtn(true) //create Deck Btn gets hidden
    }
  }

  return (
   
    <Button
      variant='secondary'
      className='deck__openDeck mt-22px'
      size='sm'
      onClick={openDeckHandler}
      title='Click to open this deck'
      style={{
        backgroundColor: 'rgb(108, 117, 125)',
        pointerEvents: editButtonClicked? 'auto':'none',
        cursor: paused || data.length === 0 || editButtonClicked ? 'pointer': 'default',
        opacity: paused || data.length === 0 ? '0' : '1' //open deck button is not visible when length is zero
      }}
    >
      Open Deck
  </Button>
  )
}

