import React from 'react'
import { Alert } from 'react-bootstrap'

function CardAddedOrInput({ card }) {

  function result(){
    return card.question.trim().length !== 0 && card.answer.trim().length !== 0
  }
  return (

    <div className='height52px justify-center-align-center'
    >
      <Alert
        //when question or answer is empty, show a warning message
        variant={result() ? "success" : "danger"}
        style={{
          width: result ? '140px' : '100px',
          height: '35px'
        }}
      >
        {
          result() ?
            <div style={{ width: '140px' }}>
              Card added to Deck.
            </div>
            :
            <div style={{ width: '120px', height: '35px' }}>
              Input needed.
            </div>
        }
      </Alert>

    </div>
  )
}

export default CardAddedOrInput
