import {  useContext} from "react";
import { Context } from '../../../../context/Context';

export const SaveLogic = ({ discardEvent,
  generateRandom,
  refresh,
  saveEvent,
  setCardModified,
  setShowThreeDots}) => {

  const { setStopRedCrossListener } = useContext(Context);

 
  function stopRedCross () {
    setStopRedCrossListener(true)
    setTimeout(()=>{
    setStopRedCrossListener(false)
    },2000)
  }

  function saveHandler() {
    generateRandom();
    saveEvent();
    setCardModified(true);
    refresh();
    setShowThreeDots(true)
    stopRedCross()
  }

  function discardHandler() {
     discardEvent()
     refresh()
     setShowThreeDots(true)
    stopRedCross()
  } 

  return {discardHandler, saveHandler, stopRedCross}
}