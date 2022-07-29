import React from 'react'
import {NoAndYesLogic} from './NoAndYesLogic'
import {NoAndYesProps} from './NoAndYesInterface'

export default function NoAndYes({ data: {
  card,
  deleteCurrentCard,
  deleteWindow,
  index,
 // setEditBtnClicked,
  setShowAnswerBtn,
  resetQuestionText, //text that is active in stats.js
  randomQuestion,
  trashEvent,
  pauseCardinQuestionAnswer,
 // setPauseOrDeleteText
} }:NoAndYesProps) {

 

  const {yesHandler} = NoAndYesLogic({ 
    card,
    deleteCurrentCard,
    deleteWindow,
    index,
   // setEditBtnClicked,
    setShowAnswerBtn,
    resetQuestionText, //text that is active in stats.js
    randomQuestion,
    trashEvent,
    pauseCardinQuestionAnswer
  })


  return (
    <div className='deleteCardQuestionBox-modal-footer justify-around-align-center'>
      <div className='justify-around width80pc'>
        {
          ['No', 'Yes'].map(el =>
            <div
              key={el}
              className='deck__deleteContainerNoAndYes justify-center-align-center'
              onClick={() => {
                if (el === 'Yes') {
                  yesHandler()
                  console.log('I triggered in yes')
                }
                deleteWindow()
                // setPauseOrDeleteText(true) not sure if needed
              }}
            >
              {el}
            </div>
          )
        }
      </div>
    </div>
  )
}
