import React, { useContext } from 'react';
import { Context } from '../../../Context'

export default function InputCheckbox({ index, setShowAnswerBtn, generateRandom }) {

  const { dataBase, setDataBase } = useContext(Context)
  let newDataBase = {...dataBase}


  function cardsPaused() {

    return dataBase.DeckNames[index].data.filter(x => x.paused === true).length || 0
  }

  function handleChecked (e) {
    if(dataBase.DeckNames[index].editModeActive) {
    document.getElementById('mydeck__onOffSwitch').checked = false
    }
  }

  function switchOnOrOff () {
    if(!dataBase.DeckNames[index].editModeActive) {

      if (dataBase.DeckNames[index].data.filter(x => x.paused === true).length === 0) {
    
      } else {
      
          if(dataBase.DeckNames[index].pauseMode) {
          dataBase.DeckNames[index].pauseMode=false
          setDataBase(newDataBase)
          setShowAnswerBtn(true)
    
        }  else {
          dataBase.DeckNames[index].pauseMode=true
          setDataBase(newDataBase)
          setShowAnswerBtn(false)
          generateRandom()
      }  
    } }
  }

  return (

    <div>
      <input type="checkbox" name="deck__onOffSwitch"
        className="deck__onOffSwitch-checkbox mydeck__onOffSwitch"
        id="mydeck__onOffSwitch"
        tabIndex="0"
        onChange={handleChecked}
        value='10'
      />
      <label className="deck__onOffSwitch-label" htmlFor="mydeck__onOffSwitch"
       onClick={switchOnOrOff}
      >
        <span className="deck__onOffSwitch-inner"></span>
        <span className="deck__onOffSwitch-switch justify-center-align-center"
        >
          {`${cardsPaused()}`}
        </span>
      </label>

    </div>

  )
}