
import React, { useState, useContext, useEffect } from 'react';
import { Modal} from 'react-bootstrap'
import { Context } from '../../../Context';
import '../../../styles.scss'
import closeWindow from "../../../icons/closeWindow.svg";
import AlertComponent from './AlertComponent'

export default function AddQuestionsToDeck({ index, name, 
  show, setShow, setScrollbarVisible}) {

  const [card, setCard] = useState({ question: '', answer: '' })
  const [newCardAdded, setNewCardAdded] = useState(false);

  const { 
    dataBase,
    editButtonClicked, 
    setShowProgressDiagram,
  } = useContext(Context);

  // function addToDeck() {

  //   let newDataBase = { ...dataBase }
  //   newDataBase.DeckNames[index].data.push(card)
  //   setDataBase(newDataBase)
  //   setNewCardAdded(true)

  //   if (card.question.trim().length !== 0 && card.answer.trim().length !== 0) {
  //     setTimeout(() => {
  //       setCard({ question: '', answer: '' })
  //       setNewCardAdded(false)
  //     }, 650)
  //   }
  // }

  
  function hideHandler () {
    setShow(false)
    setShowProgressDiagram(true)
  }

  function plusHandler () {

      if(!dataBase?.DeckNames[index]?.paused || editButtonClicked) {
        
        setShow(true)
        setShowProgressDiagram(false)
        setScrollbarVisible(false)
      }
    }

   useEffect(() => {
    if (document.querySelector('.modal-dialog')) {
      let elem = document.getElementsByClassName('modal-dialog')
       elem[0].style.display='flex'
       elem[0].style.justifyContent = 'center'
      console.log(elem, 'elem here')
    }
  
   
  //   if (show) {
  //    setShowProgressDiagram(false)

  //   } else {
  //     setShowProgressDiagram(true)
  //     if (dataBase?.DeckNames?.length === 1 || dataBase?.DeckNames?.length === 0) {
  //       setScrollbarVisible(false)
  //     } else {
  //       setScrollbarVisible(true)
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [show]);


  useEffect(() => {

    setTimeout(() => { setNewCardAdded(false) }, 650)
  }, [newCardAdded]);


  return (

    <div>
      <button
        className='AddQuestionsToDeck-btn-plus justify-center-align-center outline-none'
        style={{cursor: dataBase.DeckNames[index]?.paused || 
                        !editButtonClicked ? 'default' : 'pointer'
        }}
        onClick={plusHandler}
      >
        +
      </button> 
      <div className='marginAuto'>
        <Modal
          show={show}
          contentClassName={'mod'}
          backdrop='static'
          onHide={hideHandler}
        >
          <Modal.Header className='border-bottom-0'>
            <Modal.Title className='justify-between'>
              <span className='align-center'>Deck: {name}</span>
              <button
                className='redCross pointer'
                onClick={() => setShow(false)}
              >
              <img
                src={closeWindow}
                alt='redCross'
                className='nonDraggableIcon width16px height16px'
              /> 
              </button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body > 
          <AlertComponent 
              card={card}
              setCard={setCard}
              newCardAdded={newCardAdded} 
          />
            <button
            //   onClick={addToDeck}
              className='generalButtonStyling deck__addToDeck mt-20px ml-21px'
            >
              Add to Deck
            </button>
          </Modal.Body> 
        </Modal>
      </div>
    </div>
  )
}
