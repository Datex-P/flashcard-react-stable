import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal, Row } from "react-bootstrap";
import { Context } from "../Context"; 
import Button from './Button'

// interface CreateNewDeckProps {
//   addNewDeckWindow?: boolean, 
//   decksAreVisible: boolean,
//   editButtonClicked: boolean,
//   createDeckHandler: ()=>void,
//   setArrowDown: (arg0: boolean)=>void,
//   setDecksAreVisible: (arg0: boolean)=>void, 
//   setScrollbarVisible: (arg0: boolean)=>void,
//   close: any
// }




export default function CreateNewDeck({
  addNewDeckWindow, 
  createDeckHandler,
  closeHandler, 
  hideCreateDeckBtn, setHideCreateDeckBtn,
  decksAreVisible, setDecksAreVisible,
  editButtonClicked,
  setArrowDown,
  setScrollbarVisible // scrollbar dissapear when stats or settings are open
}
// :CreateNewDeckProps
) {

  const {
     setActive, 
     colors, //colors array for the decks
   //  dataBase, setDataBase, 
     setShowProgressDiagram, 
  } = useContext(Context);

   const [inputField, setInputField] = useState('');
   const [nameTooShortOrLong, setNameTooShortOrLong] = useState(false);




  const inputRef = useRef<HTMLInputElement | null>(null);
  const okRef = useRef<HTMLInputElement | null>(null);
 
  useEffect(() => {
    if (addNewDeckWindow) {
      inputRef?.current?.focus();
      setShowProgressDiagram(false);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewDeckWindow]);



  // function addNewDeckName() {

  //   let newDataBase = { ...dataBase };

  //     let index = newDataBase.DeckNames.push({
  //       name: inputField,
  //       data: [],
  //       cardsToday: 0,
  //       color: colors[Object.keys(dataBase?.DeckNames).length % colors?.length],
  //       paused: false,
  //       thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
  //       skipPausedCards: 0,
  //       pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
  //       editModeActive: false, //when editModeActive is true, pause switch can t be clicked 
  //     });

  //     if (dataBase?.DeckNames?.length === 1 || dataBase?.DeckNames?.length === 0) {
  //       setScrollbarVisible(false)   //scrollbar on the side is not visible when zero or only one deck on the stack
  //     } else {
  //       setScrollbarVisible(true)
  //     }
  //     setActive(index - 1);
  //     setInputField("");
  //     setDataBase(newDataBase);
  //     close();
  //   }

    function onChangeHandler (event:any) {
      let {target} = event
     // let value = ReactEvent.Form.target(event)
     if (target){
       setInputField(event.target.value)
    }

      setTimeout(()=>{           
            if (event.target.value.length  > 3 && event.target.value.length < 11) {
              if (okRef !== null && okRef.current) {
              okRef.current.disabled = false
              okRef.current.classList.add('okCancelButtonColor');           
              setNameTooShortOrLong(false)
              }
            } else if (okRef.current){ 
              setNameTooShortOrLong(true)
              okRef.current.disabled = true
              okRef?.current?.classList.remove('okCancelButtonColor');
            }
          }, 800)
    }

  const createDeckElem = window.document.getElementById('createDeck')
  if (createDeckElem) {
  var createDeckElement = createDeckElem.parentElement
  }
  //https://stackoverflow.com/questions/55588968/type-error-object-is-possibly-null-ts2531-for-window-document
  // let check = false
  
  // if(createDeckElement) {
  //   var createDeckParent = createDeckElement.parentElement
  //   check = true
  // }
  // if (createDeckElement) {
  // createDeckParent = createDeckElement.parentElement
  // }
  if (createDeckElement) { 
    createDeckElement.style.display = 'flex'
    createDeckElement.style.justifyContent = 'center'
    createDeckElement.style.alignItems = 'center'
    createDeckElement.style.height = '500px'
    }

  return (
    <Row className='justify-center mt-350px'>
      {hideCreateDeckBtn === false &&
      <button
        className='row__btn-create-deck'
        style={{cursor: !editButtonClicked ? "default" : "pointer"}}
        onClick={createDeckHandler}
      >
          Create Deck
      </button> 
      } 
      <div className='mt-40px'>
      <Modal
        show={addNewDeckWindow}
        backdrop="static"
        keyboard={false}
        id="createDeck"
        centered
      >
        <Modal.Header>
            <Modal.Title>
              Name for new deck
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="align-center flex-column">
          <input
             id="inputField"
            // ref={inputRef}
             value={inputField}
             onChange={(event:any) => {
              onChangeHandler(event)
             }}
          />
            <div className='createNewDeck__too-short-or-long'>
              {
              // `${
              //   dataBase?.DeckNames?.map(a=>a.name).includes(inputField)?
              //   'name exists':
              //   nameTooShortOrLong && inputField.length<4? 'too short':
              //   nameTooShortOrLong && inputField.length>11? 'too long':
              //   ''
              //   }`
              }
            </div>     
          <select className="createNewDeck__select-options">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
          </select>
        </Modal.Body>
        <div className="width57pc marginAuto posRelative justify-between">
           <Button 
            setArrowDown={setArrowDown} 
            setInputField={setInputField} 
          //  addNewDeckName={addNewDeckName}
            closeHandler={closeHandler}  
            setHideCreateDeckBtn={setHideCreateDeckBtn}
          />
          <Button 
            setArrowDown={setArrowDown} 
            setInputField={setInputField}
           // addNewDeckName={addNewDeckName}
           closeHandler={closeHandler} 
           setHideCreateDeckBtn={setHideCreateDeckBtn}
            ok 
          /> 
        </div>
      </Modal> 
     </div>
    </Row>
  );
}
