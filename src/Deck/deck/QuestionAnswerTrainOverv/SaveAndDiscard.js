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

  return (
    <div className='d-flex justify-center'>
      <div className='width166px deck__saveAndDiscard justify-aroundCenter flex-column'>
        <div>Save changes?</div>
        <div className='justify-between width140px'>
          {["Discard", "Save"].map((el, index) => (
            <div
              className={`deck__saveAndDiscardBtn justify-aroundCenter ${el}Btn`}
              onClick={
              el === "Save"? saveHandler(): () => {discardEvent();refresh()}
              }
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
