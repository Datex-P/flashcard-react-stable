import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../styles.scss'
import NoAndYes from './NoAndYes'
import QuestionMarkCont from './QuestionMarkCont'
import ShowMessage from './ShowMessage'
import FlashcardTextOrReset from './FlashcardTextOrReset'

export default function DeleteCardQuestionBox({ 
  card, 
  pauseOrDelete,
  deleteWindow, 
  trashEvent, 
  setShowAnswerBtn=()=>{},
  setEditModeActive=()=>{},
  showDeleteWindow,
  deleteCurrentCard=()=>{},
  resetQuestionText=false,
  showMessageAgain= false,
  pauseCardinQuestionAnswer=false,
  randomQuestion,
  index,
  // setPauseOrDeleteText=()=>{}
                                              }) 
  
{

  const noAndYesProps = {
    trashEvent:trashEvent,
    deleteCurrentCard:deleteCurrentCard,
    deleteWindow:deleteWindow,
    setEditModeActive:setEditModeActive,
    setShowAnswerBtn:setShowAnswerBtn,
    pauseCardinQuestionAnswer:pauseCardinQuestionAnswer,
    index:index,
    card: card,
    randomQuestion:randomQuestion,
  }

return (
      <Modal
        show={showDeleteWindow}
        onHide={deleteWindow}
        backdrop="static"
        keyboard={false}
        id='deleteWindow'
        dialogClassName='backgroundModal'
        className='justify-center zIndex-5'
      >
        <QuestionMarkCont />
        <Modal.Header>
            <Modal.Title>
              <FlashcardTextOrReset 
                resetQuestionText={resetQuestionText}
                pauseOrDelete={pauseOrDelete}
                card={card}
              />
            </Modal.Title>
            <div className='deck__redCross-cont'>
              <div className='deck__redCross'>
                  x
              </div>
            </div>
        </Modal.Header>
        <Modal.Body className='justify-center-align-center deck__bg-white'>        
            <ResetQuestionText 
              pauseOrDelete={pauseOrDelete} 
              resetQuestionText={resetQuestionText} 
              card={card} 
            />
        </Modal.Body>
        <Modal.Footer className='deck__bg-white'>
          <NoAndYes data={noAndYesProps} />            
        </Modal.Footer>
        <ShowMessage showMessageAgain={showMessageAgain}/>         
      </Modal>
  );
}

function ResetQuestionText({resetQuestionText, pauseOrDelete, card}) {
  return(
    <>
    {
      resetQuestionText?  
      'Do you want to reset the stats?'
         : 
      `Do you want to ${pauseOrDelete.toLowerCase()} this ${card} ?` 
    }
    </>
  )
}


