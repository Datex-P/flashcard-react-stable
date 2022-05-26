import React, {useContext} from 'react'
import { Button} from "react-bootstrap";
import { Context } from "../../../Context";

export default function OpenDeckBtn ({data, 
  paused, generateRandom,
  setScrollbarVisible,
  setHideCreateDeckBtn
}) {

  const {
    dataBase, setDataBase, 
    editButtonClicked, 
    setHideMenu,
    setShowProgressDiagram //progressDiagram is shown in the back of main 
  } = useContext(Context);

  function openDeckHandler () {
    if(!paused ||  editButtonClicked) {
      generateRandom();
      let newDataBase = { ...dataBase };
      newDataBase.openedToday = true;
      setShowProgressDiagram(false); //progress diagram gets why not at this place??
      setDataBase(newDataBase);
      setScrollbarVisible(false) //as long as deck is open, scrollbar is not visible
      setHideCreateDeckBtn(true) //create Deck Btn gets hidden
      setHideMenu(true)
    }
  }

  return (
   
    <Button
      variant="secondary"
      className="deck__openDeck mt-22px"
      size="sm"
      onClick={openDeckHandler}
      style={{
        backgroundColor:  "rgb(108, 117, 125)",
        cursor: paused || data.length === 0 || !editButtonClicked ? "default": "pointer",
        opacity: paused || data.length === 0 ? "0" : "1" //open deck button is not visible when length is zero
      }}
    >
      Open Deck
  </Button>
  )
}

