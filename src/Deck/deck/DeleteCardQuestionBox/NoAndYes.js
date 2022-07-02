import React, { useContext } from 'react'
import { Context } from '../../../Context'



export default function NoAndYes({ data: {
  card,
  deleteCurrentCard,
  deleteWindow,
  index,
  setEditBtnClicked,
  setShowAnswerBtn,
  resetQuestionText, //text that is active in stats.js
  randomQuestion,
  trashEvent,
  pauseCardinQuestionAnswer,
  setPauseOrDeleteText
} }) {

  const { apiURL, dataBase, setDataBase, email, nameOfTopDeck } = useContext(Context)

  async function yesHandler() {
    let deckName = nameOfTopDeck
    trashEvent()
    deleteCurrentCard()
    // setShowRepeatBtn(false) not sure if needed
    setShowAnswerBtn(true)
   // setEditBtnClicked(false) ==>maybe not needed, unsure

    if (pauseCardinQuestionAnswer) {
      let newDataBase = { ...dataBase }
      dataBase.DeckNames[index].data[randomQuestion].paused = true
      setDataBase(newDataBase)
    }

    if (card === 'deck') {
      console.log('fired inside threedots')
      await fetch(`${apiURL}/delete_deck`, {
        method:"POST",
        headers: {
          "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
          email:email,
          deckName:deckName
          })
        });
    }
    if (resetQuestionText) {
      await fetch(`${apiURL}/reset_progress`, {
        method:"POST",
        headers: {
          "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
          email:email
          })
        });
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
