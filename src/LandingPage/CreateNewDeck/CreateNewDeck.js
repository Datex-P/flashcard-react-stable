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
  setScrollbarVisible, // scrollbar dissapear when stats or settings are open
  hideCreateDeckBtn,setHideCreateDeckBtn
}) 
{
  const {setShowProgressDiagram} = useContext(Context);

  const [inputField, setInputField] = useState('');
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

  const deckProps = {
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
