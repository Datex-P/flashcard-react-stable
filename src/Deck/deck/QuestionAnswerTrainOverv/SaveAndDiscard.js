import React from "react";

export default function saveAndDiscard({
  saveEvent,
  generateRandom,
  setCardModified,
  discardEvent,
  refresh
}) {

  
  function saveHandler() {
    generateRandom();
    saveEvent();
    refresh()
    setCardModified(true);
  }

  function discardHandler() {
    discardEvent()
    refresh()
  }

  return (
    <div className='d-flex justify-center'>
      <div className='width166px deck__saveAndDiscard justify-aroundCenter flex-column'>
        <div>Save changes?</div>
        <div className='justify-between width140px'>
          {["Discard", "Save"].map((el, index) => (
            <div
              className={`deck__saveAndDiscardBtn justify-aroundCenter ${el}Btn`}
              onClick={el === "Save"? saveHandler(): discardHandler()}
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
