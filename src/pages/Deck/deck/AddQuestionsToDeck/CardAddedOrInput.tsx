import React from 'react'
import Alert from 'react-bootstrap/Alert'

function CardAddedOrInput({ card, error }) {

  function result(){
    return card.question.trim().length !== 0 && 
    card.answer.trim().length !== 0
  }

  //when question or answer is empty, show a warning message
  
  return (
    <div className='bs-5 height52px justify-center-align-center'>
      <Alert
        variant={error? 'danger': result() ? 'success' : 'danger'}
        className='height35px'
      >
         {result() ? 
          <span className='width140px'>Card added to Deck</span>
          :
          <span className='width100px'>Input needed</span>
         }
         {error &&
           <span className='width100px'>Network error</span>
         }
      </Alert>
    </div>
  )
}

export default CardAddedOrInput
