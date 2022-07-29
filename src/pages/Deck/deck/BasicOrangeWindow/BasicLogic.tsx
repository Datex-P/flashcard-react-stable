/* eslint-disable react-hooks/exhaustive-deps */
import  { useContext, useEffect} from "react";
import { Context } from '../../../../context/Context';


export const BasicLogic = ({
  index,
  deckFinished,
  setScrollbarVisible,
  setShow,
  stats=false,
  setBlinkingSaveIcon,
  setShowAnswerBtn = (e) => {},
  setEdit = (e) => {},
  setEditModeActive = (e) => {},
}) => {

  const {
    setArrowDown,
    dataBase, setDataBase, 
    setHideCreateDeckBtn,
    setShowProgressDiagram,
  } = useContext(Context);

  let someCardsPaused = dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0


function mouseEnterHandler () {
  let element = document.querySelector('.deck__onOffSwitch-label')
  if (someCardsPaused && !dataBase.DeckNames[index].editModeActive
      && element)
   {
    element.classList.add('pointer');
  }
}

function mouseLeaveHandler () {
  if (someCardsPaused) {
    let element = document.querySelector('.deck__onOffSwitch-label')
    if(element) {
      element.classList.remove('pointer');
    }
  }
}

function saveIconBlinks(event) {
  let element = document.querySelector('.mod')
  if (element && !element.contains(event.target)) {
    console.log('clicked outside')
    setBlinkingSaveIcon(true) 
    setTimeout(()=>{
      setBlinkingSaveIcon(false)
    }, 2000)  
  }
  
}


function redCrossHandler () {
  setShow(false);
  setEdit(false);
  setHideCreateDeckBtn(false) //createDeckBtn is shown again
  //setShowRepeatBtn(false);
  setShowAnswerBtn(true);
  setEditModeActive(false);
  if (!stats){
    setScrollbarVisible(true);
  }
  setShowProgressDiagram(true) //diagram that is shown on main page
  if (index) {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
    setDataBase(newDataBase)
  }
  if (dataBase?.DeckNames?.length === 0) {     
    setArrowDown(true); //
    // setDecksAreVisible(false); 
}
}


useEffect(()=>{
  if (deckFinished) {
  console.log('red cross handler invoked')
  redCrossHandler()
  }
},[deckFinished])



  return {redCrossHandler, saveIconBlinks, mouseLeaveHandler, mouseEnterHandler }
}