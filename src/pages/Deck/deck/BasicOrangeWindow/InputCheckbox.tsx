import React from 'react';
import {InputLogic} from './InputLogic'

export default function InputCheckbox({ 
  index, 
  setShowAnswerBtn, 
  generateRandom }) {

  const {cardsPaused, handleChecked, switchOnOrOff} = InputLogic({
    index, 
    setShowAnswerBtn, 
    generateRandom })


  return (
    <div>
      <input 
        type="checkbox" 
        name="deck__onOffSwitch"
        className="deck__onOffSwitch-checkbox mydeck__onOffSwitch"
        id="mydeck__onOffSwitch"
        // tabIndex="0"
        onChange={handleChecked}
        value='10'
      />
      <label 
        className="deck__onOffSwitch-label posAbsolute" htmlFor="mydeck__onOffSwitch"
        onClick={switchOnOrOff}
      >
        <span className="deck__onOffSwitch-inner"></span>
        <span className="deck__onOffSwitch-switch justify-center-align-center">
          {`${cardsPaused()}`}
        </span>
      </label>

    </div>

  )
}