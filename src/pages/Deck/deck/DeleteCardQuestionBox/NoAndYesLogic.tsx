import  { useContext } from 'react'
import { Context } from '../../../../context/Context'



export const NoAndYesLogic = ({
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
})=>{

  const { apiURL, dataBase, setDataBase, email, nameOfTopDeck } = useContext(Context)

  async function yesHandler()  {
  
  let deckName = nameOfTopDeck
  trashEvent()
  deleteCurrentCard()
  // setShowRepeatBtn(false) not sure if needed
  setShowAnswerBtn(true)
 // setEditBtnClicked(false) ==>maybe not needed, unsure

  if (pauseCardinQuestionAnswer) {
    let newDataBase = { ...dataBase }
    newDataBase.DeckNames[index].data[randomQuestion].paused = true
    //debugger
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
    let newDataBase = {...dataBase}
    newDataBase.DeckNames.map(x => x.data.openHistory =[])
    setDataBase(newDataBase)

    let response = await fetch(`${apiURL}/reset_progress`, {
      method:"POST",
      headers: {
        "Access-Control-Allow-Origin": "*",     
        "Content-Type":"application/json",
      },
        body: JSON.stringify({
        email:email
        })
      });

      if(response.status === 500) {
        console.log('error')
      }  
  }
}

  return {yesHandler}
}
