import React, { useState } from 'react';


function RepetitionIntervalFields(
  { data: { name, amount, unit },
    editModeActive, index,
    userTimePreferences, setUserTimePreferences,
    editRepActive
  }) {

  const [inputNumber, setInputNumber] = useState(amount)
  const [inputText, setInputText] = useState(name)

  function handleInputNumbers(e) {

    if (e.target.value.length < 3) {
        setInputNumber(e.target.value)
        let newUserTimePreferences = [...userTimePreferences]
        newUserTimePreferences[index].amount = e.target.value
        setUserTimePreferences(newUserTimePreferences)
    }
  }

  function checker(e) {
    let { value } = e.target;
    let newValue = value.replace(/[^0-9]/g, '')
    if (newValue.length < 4) {
        setInputNumber(newValue)
    }
  }

  function handleInputText(e) {
    setInputText(e.target.value)
    let newUserTimePreferences = [...userTimePreferences]
    newUserTimePreferences[index].name = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }

  // https://stackoverflow.com/questions/60115396/react-typescript-error-in-textarea-type-string-is-not-assignable-to-type-num

  return (
    <div className='p-2 flex-column justify-center-align-center'>
      <div className={`settings__intervalFields-p justify-around ${editRepActive? 'align-center':'p-4px'}`}>
        <div>
          {!editRepActive && '<'}
        </div>
        <form className={`${editRepActive?'width34px': 'widthFitContent'}`}>
          {editRepActive?        
            <input
              //  type='number'          
              style={{
                backgroundColor: editRepActive ? '#545863' : 'transparent',
                cursor: editRepActive ? 'pointer' : 'default',
                color: editRepActive ? 'white' : 'black',
              }}
              className='height20px width15px'
              disabled={!editModeActive}
              value={inputNumber}
              onChange={handleInputNumbers}
              onInput={checker}
            />
              :
            <div className='widthFitContent'>{inputNumber}</div>
          }
        </form>
        <div className='fontBold'>
          {unit}
        </div>
      </div>
      <form className='mt-5px'>
        <input
          value={inputText}
          type='text'
          disabled={!editModeActive}
          onChange={handleInputText}
          className='settings__interval-textFields'
          maxLength={8}
          minLength={3}
          style={{
            cursor: editModeActive ? 'pointer' : 'default',
            backgroundColor: editRepActive ? '#545863' : 'grey'
          }}
        />
      </form>
    </div>
  )
}

export default RepetitionIntervalFields
