import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../styles.scss'
import NoAndYes from './NoAndYes'
import resetimg from '../../../icons/reset.svg'
import questionMark from '../../../icons/questionMark.svg'
import flashcards from '../../../icons/flashcards.svg'
import ShowMessage from './ShowMessage'

export default function DeleteCardQuestionBox({ card, 
  pauseOrDelete,deleteWindow, 
  trashEvent, 
  setShowAnswerBtn=()=>{},
  setEditBtnClicked=()=>{},
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

  return (
 
      <Modal
        show={showDeleteWindow}
        onHide={deleteWindow}
        backdrop="static"
        keyboard={false}
        id='deleteWindow'
        dialogClassName='backgroundModal'
        className='justify-center posRelative zIndex-5'
      >
        <div>
            <img 
                src={questionMark} 
               className='deck__question-mark questionMark1'        
                 alt='questionMark' 
            />
            <img 
              src={questionMark} 
              className='deck__question-mark questionMark2'
               alt='questionMark'              
            />
        </div>
        <Modal.Header 
          
        >
            <Modal.Title>
                <div className='height85pc width100pc justify-center-align-center'>
                  <div>
                      {
                        resetQuestionText? 
                          <img 
                              src={resetQuestionText? resetimg: flashcards} 
                              className='justify-center-align-center width26px deck__DeleteCardQuestionBox__img' 
                              alt='reset'                         
                          />
                          :
                          <img 
                              src={flashcards} 
                              className='justify-center-align-center width26px deck__DeleteCardQuestionBox__img' 
                              alt='flashcards'                         
                          />

                      }
                  </div>
                  <div>  
                    {
                    resetQuestionText? 
                    'Reset progress':`${pauseOrDelete} ${card}`
                    }
                  </div>
              </div>
            </Modal.Title>
            <div className='deck__redCross-cont'>
              <div className='deck__redCross'>x</div>
            </div>
        </Modal.Header>
        <Modal.Body 
            className='justify-center-align-center background__white' 
        >
            {
              resetQuestionText?  
              'Do you want to reset the stats?'
                    : 
                `Do you want to ${pauseOrDelete.toLowerCase()} this ${card} ?` 
            }
        </Modal.Body>
        <Modal.Footer
            className='background__white'
        >
            <NoAndYes
                trashEvent={trashEvent}
                deleteCurrentCard={deleteCurrentCard}
                deleteWindow={deleteWindow}
                setEditBtnClicked={setEditBtnClicked}
                setShowAnswerBtn={setShowAnswerBtn}
                pauseCardinQuestionAnswer={pauseCardinQuestionAnswer}
                index={index}
                randomQuestion={randomQuestion}
            />            
        </Modal.Footer>

        {!showMessageAgain&&
               
        <ShowMessage />         
          }
      </Modal>
  );
}


