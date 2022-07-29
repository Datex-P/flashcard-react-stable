import React from "react";
import {SaveLogic} from './SaveLogic'

export default function SaveAndDiscard({
  discardEvent,
  generateRandom,
  refresh,
  saveEvent,
  setCardModified,
  setShowThreeDots
}) {

  const {discardHandler, saveHandler, 
   // stopRedCross
  } = SaveLogic({ discardEvent,
    generateRandom,
    refresh,
    saveEvent,
    setCardModified,
    setShowThreeDots})


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
