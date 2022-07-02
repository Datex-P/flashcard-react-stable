import React, {  useContext} from "react";
import { Context } from "../../../Context";

export default function SaveAndDiscard({
  saveEvent,
  index, //index of the deck
  randomQuestion, //index of question that is currently open inside deck
  generateRandom,
  setCardModified,
  discardEvent,
  refresh,
  setShowThreeDots
}) {

  const {
    apiURL,
    email,
    dataBase, setDataBase, 
    nameOfTopDeck,
    setShowProgressDiagram,
    //setShowThreeDots,
    stopRedCrossListener,
    setStopRedCrossListener
    } = useContext(Context);

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

  return (
    <div className='d-flex justify-center'>
      <div className='width166px deck__saveAndDiscard justify-around-align-center flex-column'>
        <div>
          Save changes?
        </div>
        <div className='justify-between width140px'>
          {['Discard', 'Save'].map((el, index) => (
            <div
              className={`deck__saveAndDiscardBtn justify-center-align-center ${el}Btn`}
              onClick={el === 'Save'? saveHandler: discardHandler}
              key={index}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
