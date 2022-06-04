import React from "react";

export default function SaveAndDiscard({
  saveEvent,
  generateRandom,
  setCardModified,
  discardEvent,
  refresh,
  setShowThreeDots
}) {

  function saveHandler() {
    generateRandom();
    saveEvent();
    setCardModified(true);
    refresh();
    setShowThreeDots(true)
  }

  function discardHandler() {
     discardEvent()
     refresh()
     setShowThreeDots(true)
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
