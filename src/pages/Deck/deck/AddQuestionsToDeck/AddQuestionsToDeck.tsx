import React, { useState, useContext} from "react";
import { Modal } from "react-bootstrap";
import { Context } from '../../../../context/Context';
import '../../../../styles.scss';
import QuestionAnswerComp from './QuestionAnsw';
import closeWindow from '../../../../icons/closeWindow.svg';
import {AddLogic} from './AddLogic'


export default function AddQuestionsToDeck({
  index,
  name,
  show,setShow,
//  setScrollbarVisible
}) {
  const {
    dataBase,
   editButtonClicked
  } = useContext(Context);

  const [card, setCard] = useState({ question: '', answer: ''});
  const [newCardAdded, setNewCardAdded] = useState(false);
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false);
  const [error, setError] = useState(false)
  const [addToDeckButton, setAddToDeckButton] = useState(false) //when active message like input needed appears

  const {addToDeck, closeHandler, hideHandler, plusHandler} = AddLogic({
     card, setCard, 
     index, 
     setAddToDeckButton,
     setBlinkingSaveIcon, 
     setError,
     show, setShow, 
     newCardAdded, setNewCardAdded
  })
  
         
  return (
    <div>
      <button
        className='deck__addToDeck__btn_plus justify-center-align-center outline-none'
        style={{
          cursor:
            dataBase.DeckNames[index]?.paused || !editButtonClicked
              ? 'default' : 'pointer',
        }}
        onClick={plusHandler}
        title='Add questions to this deck'
      >
        +
      </button>
      <div className='marginAuto'>
        <Modal
          show={show}
          contentClassName={"modAddToDeck"}
          backdrop='static'
          onHide={hideHandler}
          dialogClassName='deck__addQuestion-modal posRelative justify-center'
        >
          <Modal.Header className='border-bottom-0'>
            <Modal.Title className='justify-between-align-center mod-title'>
              <span className='align-center'>Deck: {name}</span>
              <button
                className='deck__redCross-mod pointer deck__bg-orange'
                onClick={closeHandler}
              >
                <img
                  src={closeWindow}
                  alt='redCross'
                  className={`nonDraggableIcon deck__addquestion-img width20px height20px 
                            ${blinkingSaveIcon ? 'deck__blinkingIcon' : ''}`
                  }
                />
              </button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionAnswerComp
              addToDeckButton={addToDeckButton}
              card={card}
              setCard={setCard}
              error={error}
              newCardAdded={newCardAdded}
            />
            <button
              onClick={addToDeck}
              className='deck__addToDeck mt-20px ml-21px cursorPointer'
            >
              Add to Deck
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
