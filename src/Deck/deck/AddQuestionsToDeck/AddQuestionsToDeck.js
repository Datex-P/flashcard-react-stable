
import React, { useState, useContext, useEffect } from 'react';
import { Modal} from 'react-bootstrap'
import { Context } from '../../../Context';
import '../../../styles.scss'
import closeWindow from "../../../icons/closeWindow.svg";
import AlertComponent from './AlertComponent'

export default function AddQuestionsToDeck({ index, name, 
  show, setShow, setScrollbarVisible, setHideCreateDeckBtn}) {

  const [card, setCard] = useState({ question: '', answer: '' })
  const [newCardAdded, setNewCardAdded] = useState(false);

  const { 
    dataBase,setDataBase,
    editButtonClicked, 
    setShowProgressDiagram,
    setHideMenu
  } = useContext(Context);

  function addToDeck() {
    let newDataBase = { ...dataBase }
    newDataBase.DeckNames[index].data.push(card)
    setDataBase(newDataBase)
    setNewCardAdded(true)

    if (card.question.trim().length !== 0 && card.answer.trim().length !== 0) {
      setTimeout(() => {
        setCard({ question: '', answer: '' })
        setNewCardAdded(false)
      }, 650)
    }
  }

  function hideHandler () {
    setShow(false)
    setShowProgressDiagram(true)
    setHideCreateDeckBtn(false)
    setScrollbarVisible(true)
    console.log('hide triggered')
  }

  // plusHandler gets triggered when User clicks on plus Icon
  // is deactivated when the deck is paused, so User has to unpause
  //the deck to add cards to the deck

  function plusHandler () {
      if(!dataBase?.DeckNames[index]?.paused || editButtonClicked) {
        setHideCreateDeckBtn(true)
        setShow(true)
        setShowProgressDiagram(false)
        setScrollbarVisible(false)
        setHideMenu(true)
      }
    }

   useEffect(() => {
    if (document.querySelector('.modal-dialog')) {
      let elem = document.getElementsByClassName('modal-dialog')
       elem[0].style.display='flex'
       elem[0].style.justifyContent = 'center'
       elem[0].style.width = '87%'
       elem[0].style.position = 'relative'
       elem[0].style.zIndex = '5'
       elem[0].style.padding = '27px'
       elem[0].style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
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
    let i = setTimeout(() => { setNewCardAdded(false) }, 650)
    return ()=>{
      clearInterval(i)
    }
  }, [newCardAdded]);

  /*create Deck btn and menu icons are shwon again
  set show closes the add to deck window*/

  function closeHandler () {
    setShow(false)
    setHideCreateDeckBtn(false)
    setShowProgressDiagram(true)
    setHideMenu(false) 
    setScrollbarVisible(true)
  }

  return (
    <div>
      <button
        className='deck__addToDeck__btn_plus justify-center-align-center outline-none'
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
          contentClassName={'modAddToDeck'}
          backdrop='static'
          onHide={hideHandler}
        >
          <Modal.Header 
              className='border-bottom-0'
          >
            <Modal.Title 
              className='justify-between mod-title'
            >
              <span className='align-center'>Deck: {name}</span>
              <button
                className='redCross pointer'
                onClick={closeHandler}
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
              onClick={addToDeck}
              className='deck_add_btn deck__addToDeck mt-20px ml-21px'
            >
              Add to Deck
            </button>
          </Modal.Body> 
        </Modal>
      </div>
    </div>
  )
}
