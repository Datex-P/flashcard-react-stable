import React from 'react'
import { Alert } from 'react-bootstrap'

function CardAddedOrInput({ card }) {

  function result(){
    return card.question.trim().length !== 0 && card.answer.trim().length !== 0
  }
  
  return (

    <div className='height52px justify-center-align-center'>
      <Alert
        //when question or answer is empty, show a warning message
        variant={result() ? "success" : "danger"}
        className={`height35px ${result? 'width140px':'width100px'}`}
      >
        {
          result() ?
            <div className='width140px'>Card added to Deck.</div>
            :
            <div className='width120px height35px'>Input needed.</div>
        }
      </Alert>
    </div>
  )
}

export default CardAddedOrInput
