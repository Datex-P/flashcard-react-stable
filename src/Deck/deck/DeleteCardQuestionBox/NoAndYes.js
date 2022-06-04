import React, { useContext } from 'react'
import { Context } from '../../../Context'



export default function NoAndYes({ data: {
  deleteCurrentCard,
  setEditBtnClicked,
  index,
  setShowAnswerBtn,
  trashEvent,
  pauseCardinQuestionAnswer,
  randomQuestion,
  deleteWindow,
  setPauseOrDeleteText
} }) {

  const { dataBase, setDataBase } = useContext(Context)

  function yesHandler() {
    trashEvent()
    deleteCurrentCard()
    // setShowRepeatBtn(false) not sure if needed
    setShowAnswerBtn(true)
    setEditBtnClicked(false)

    if (pauseCardinQuestionAnswer) {
      let newDataBase = { ...dataBase }
      dataBase.DeckNames[index].data[randomQuestion].paused = true
      setDataBase(newDataBase)
    }
  }


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
