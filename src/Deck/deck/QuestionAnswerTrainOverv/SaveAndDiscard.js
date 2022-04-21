import React from "react";

export default function saveAndDiscard({
  saveEvent,
  generateRandom,
  setCardModified,
  discardEvent,
}) {
  function saveHandler() {
    generateRandom();
    saveEvent();
    setCardModified(true);
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='saveAndDiscard justify-aroundCenter flex-column'>
        <div>Save changes?</div>
        <div className='justify-between width140px'>
          {["Discard", "Save"].map((el, index) => (
            <div
              className={`saveAndDiscardButtonStyling justify-aroundCenter ${el}Btn`}
              onClick={
                el === "Save"
                  ? saveHandler()
                  : () => {
                      discardEvent();
                    }
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
