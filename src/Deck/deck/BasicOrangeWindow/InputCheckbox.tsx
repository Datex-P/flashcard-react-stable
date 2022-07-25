import React, { useContext } from 'react';
import { Context } from '../../../Context'

export default function InputCheckbox({ 
  index, 
  setShowAnswerBtn, 
  generateRandom }) {

  const { dataBase, setDataBase } = useContext(Context)
  let newDataBase = {...dataBase}

  function cardsPaused() {
    return dataBase.DeckNames[index].data.filter(x => x.paused === true).length || 0
  }


    // https://bobbyhadz.com/blog/typescript-property-checked-not-exist-on-type-htmlelement#:~:text=The%20error%20%22Property%20'checked',This%20is%20the%20index.
      //Type assertions are used when we have information about the type of a value that TypeScript can't know about.
 
  function handleChecked (e) {
    let element =  document.getElementById('mydeck__onOffSwitch') as HTMLInputElement | null
    if(dataBase.DeckNames[index].editModeActive && element) {
    element.checked = false
    }
  }

  function switchOnOrOff () {
    if(!dataBase?.DeckNames[index]?.editModeActive) {

      let element =  document.querySelector('.deck__onOffSwitch-checkbox') as HTMLInputElement | null
     
      if (dataBase.DeckNames[index].data.filter(x => x.paused === true).length === 0 && element) {
        element.disabled = true
      } else {    
          if (dataBase.DeckNames[index].pauseMode) {
            dataBase.DeckNames[index].pauseMode=false
            setDataBase(newDataBase)
            setShowAnswerBtn(true)    
          }else{
            dataBase.DeckNames[index].pauseMode=true
            setDataBase(newDataBase)
          //  setShowAnswerBtn(false)
            generateRandom()
      }  
    }}
  }

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