import React from 'react';
import { FormControl } from 'react-bootstrap';
import CardAddedOrInput from './CardAddedOrInput';
import '../deck.css';

function QuestionAnsw({ 
  addToDeckButton, 
  card, setCard, newCardAdded, error }) {
 
  function changeHandler(e) {
    let newCard = { ...card };
    let { name, value } = e.target;
    newCard[name] = value;
    setCard(newCard);
  }

  return (
    <>
      <div className='mb-2'>
        <p className='deck__questionAnswer fontBold'>
           Question
        </p>
        <FormControl
          as='textarea'
          aria-label='With textarea'
          value={card.question}
          name='question'
          onChange={changeHandler}
          className='deck__formControl posRelative'
        />
        {addToDeckButton && 
          <CardAddedOrInput 
            card={card} 
            error={error}
          />
          }
      </div>
      <div className={`${newCardAdded? 'mt-60px': 'mt-50px'}`}>
        <p className='deck__questionAnswer fontBold'>
           Answer
        </p>
        <FormControl
          as='textarea'
          aria-label='With textarea'
          value={card.answer}
          name='answer'
          onChange={changeHandler}
          className='deck__formControl posRelative'
        />
      </div>
    </>
  );
}

export default QuestionAnsw;
