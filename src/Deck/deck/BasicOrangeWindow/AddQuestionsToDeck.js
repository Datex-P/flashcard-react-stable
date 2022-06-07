
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
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)


  const { 
    dataBase,setDataBase,
    editButtonClicked, 
    setShowProgressDiagram,
  //  setdeck__deckEmptyCont
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
    //    setdeck__deckEmptyCont(true)
      }
    }

   useEffect(() => {
  
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
 //   setdeck__deckEmptyCont(false) 
    setScrollbarVisible(true)
  }
  

  useEffect(()=>{
    let element = document.querySelector('.modAddToDeck')

    function saveIconBlinks(event) {
      if (element && !element.contains(event.target)
      ) {
        console.log('clicked outside')
        setBlinkingSaveIcon(true) 
       setTimeout(()=>{
         setBlinkingSaveIcon(false)
       }, 2000)  
     }
    }
    document.addEventListener('click', saveIconBlinks)
    return ()=>{document.removeEventListener('click', saveIconBlinks); setBlinkingSaveIcon(false);console.log('got unmounted')}
  },[show])

  return (
    <div>
      <button
        className='deck__addToDeck__btn_plus justify-center-align-center outline-none'
        style={{cursor: dataBase.DeckNames[index]?.paused || 
                        !editButtonClicked ? 'default' : 'pointer'
        }}
        onClick={plusHandler}
        title='Add questions to this deck'
      >
        +
      </button> 
      <div className='marginAuto'>
        <Modal
          show={show}
          contentClassName={'modAddToDeck'}
          backdrop='static'
          onHide={hideHandler}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            zIndex: '5',
            width: '98%',
            height:'651px',
            position: 'relative'
          }}
        >
          <Modal.Header 
              className='border-bottom-0'
          >
            <Modal.Title 
              className='justify-between-align-center mod-title'
            >
              <span className='align-center'>Deck: {name}</span>
              <button
                className='redCross pointer deck__bg-orange'
                onClick={closeHandler}
              >
              <img
                src={closeWindow}
                alt='redCross'
                className={`nonDraggableIcon width16px height16px ${blinkingSaveIcon ? 'deck__blinkingIcon':''}`}
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
              className='deck__addToDeck mt-20px ml-21px'
            >
              Add to Deck
            </button>
          </Modal.Body> 
        </Modal>
      </div>
    </div>
  )
}