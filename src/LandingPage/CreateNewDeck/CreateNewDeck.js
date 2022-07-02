import React, { useContext, useState, useRef, useEffect } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { Context } from '../../Context';
import InputSelectField from './InputSelectField';
import ButtonContainer from './ButtonContainer';

export default function CreateNewDeck({
  addNewDeckWindow,
  createDeckHandler,
  closeHandler,
  editButtonClicked,
  setArrowDown,
  inputField, setInputField,
  setScrollbarVisible, // scrollbar dissapear when stats or settings are open
}) 
{
  const {
    apiURL, 
    email, 
    colors,
    dataBase, setDataBase,
    hideCreateDeckBtn,setHideCreateDeckBtn,
    setShowProgressDiagram 
  } = useContext(Context);

  
  const [nameTooShortOrLong, setNameTooShortOrLong] = useState(false);
  const inputRef = useRef(null);
  const okRef = useRef(null);

  useEffect(() => {
    if (addNewDeckWindow) {
      inputRef?.current?.focus();
      setShowProgressDiagram(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewDeckWindow]);


useEffect(()=>{
  if(addNewDeckWindow){
    const createDeckElem = window.document.getElementById('createDeck');
  if (createDeckElem) {
    var createDeckElement = createDeckElem.parentElement;
  }
  if (createDeckElement) {
    createDeckElement.style.display = "flex";
    createDeckElement.style.justifyContent = "center";
    createDeckElement.style.alignItems = "center";
    createDeckElement.style.height = "651px";
  }
}
},[addNewDeckWindow])


function addNewDeckName() {
  let newDataBase = { ...dataBase };

 // const data =  await response.json()
  let index = newDataBase.DeckNames.push({
    name: inputField,
    data: [],
    cardsToday: 0,
    color: colors[Object.keys(dataBase?.DeckNames).length % colors?.length],
    paused: false,
    thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
    skipPausedCards: 0,
    pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
    editModeActive: false, //when editModeActive is true, pause switch can t be clicked
  });

  if (
    dataBase?.DeckNames?.length === 1 ||
    dataBase?.DeckNames?.length === 0
  ) {
    setScrollbarVisible(false); //scrollbar on the side is not visible when zero or only one deck on the stack
  } else {
    setScrollbarVisible(true);
  }
 // setActive(index - 1);
  setInputField("");
  setDataBase(newDataBase);
 // close(); not sure if needed
}

async function addDeckHandler() {
  console.log('hello from add deck handler')
  let backgroundColor = colors[Object.keys(dataBase?.DeckNames).length % colors?.length]
    try{
     let deckName = inputField
      const response =  await fetch(`${apiURL}/create_deck`, {
        method:"POST",
      headers: {
         "Access-Control-Allow-Origin": "*",     
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        email:email,
        deckName: deckName,
        backgroundColor:backgroundColor
      })
    });
    let data = await response
    console.log(data, 'data create deck')

    if (data.status === 200) {
      console.log('worked fine')
    }
} catch(error) {
console.log(error, 'error here')
}
setHideCreateDeckBtn(false)
setNameTooShortOrLong(false)
addNewDeckName()
closeHandler()
}

  const deckProps = {
    addDeckHandler:addDeckHandler,
    setArrowDown: setArrowDown,
    inputField: inputField,
    setInputField: setInputField,
    closeHandler: closeHandler,
    setHideCreateDeckBtn: setHideCreateDeckBtn,
    setNameTooShortOrLong: setNameTooShortOrLong,
    setScrollbarVisible:setScrollbarVisible
  };

  return (
    
    <Row className='justify-center mt-290px'>
      {!hideCreateDeckBtn && 
        <button
          className={`landing__row__btn-create-deck posAbsolute ${
            editButtonClicked ? 'cursorPointer' : ''
          }`}
          onClick={createDeckHandler}
          title='Click to create a new deck'
        >
          Create Deck
        </button>
      }
      <div className='mt-40px'>
        <Modal
          show={addNewDeckWindow}
          backdrop='static'
          keyboard={false}
          id='createDeck'
          centered
          style={{
            backgroundColor:'rgba(0, 0, 0, 0.6)',
            height: '651px !important',
            width:'98%',
            position: 'relative',
            borderRadius: '10px'
          }}
        >
          <Modal.Header>
            <Modal.Title>Name for new deck</Modal.Title>
          </Modal.Header>
          <Modal.Body className='align-center flex-column'>
            <InputSelectField 
              inputField={inputField}
              setInputField={setInputField}
              nameTooShortOrLong={nameTooShortOrLong}
              setNameTooShortOrLong={setNameTooShortOrLong}
              ref={okRef}
            />
          </Modal.Body>
             <ButtonContainer 
              data={deckProps} 
              ref={okRef}
            /> 
        </Modal>
      </div>
    </Row>
  );
}
